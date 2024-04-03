import React, { useEffect, useState } from "react";

import EventsList from "./components/allEventsList";

import { formatDate, convertTo12HourFormat } from "./utilities";
import mockData from "./mockData";
import { EMPTY_SPACE, SELECT_NO_MORE_THAN_3_EVENTS } from "./constants";
import SelectedEvents from "./components/selectedEventsList";

function App() {
  const [selectedIdsSet, setSelectedIdsSet] = useState(new Set());
  const [allEventsMap, setAllEventsMap] = useState(new Map());

  useEffect(() => {
    const allEventsMap = new Map();
    mockData.forEach((sportEvent) => {
      const sanitizedSportEvent = {
        ...sportEvent,
        startDate: formatDate(sportEvent.start_time.split(EMPTY_SPACE)[0]),
        endDate: formatDate(sportEvent.end_time.split(EMPTY_SPACE)[0]),
        startTime: convertTo12HourFormat(
          sportEvent.start_time.split(EMPTY_SPACE)[1]
        ),
        endTime: convertTo12HourFormat(
          sportEvent.end_time.split(EMPTY_SPACE)[1]
        ),
        conflictingSelectedIds: new Set(),
        isSelected: 0,
      };
      allEventsMap.set(sportEvent.id, sanitizedSportEvent);
    });
    setSelectedIdsSet(new Set());
    setAllEventsMap(new Map(allEventsMap));
  }, []);

  const disableConflictingEvents = (sportEvent) => {
    allEventsMap.forEach((event) => {
      if (event.id !== sportEvent.id && !event.isSelected) {
        const sportEventStartTime = new Date(sportEvent.start_time);
        const sportEventEndTime = new Date(sportEvent.end_time);
        const eventStartTime = new Date(event.start_time);
        const eventEndTime = new Date(event.end_time);
        if (
          eventStartTime < sportEventEndTime &&
          eventEndTime > sportEventStartTime //e1[0] <= e2[1] && e2[0] <= e1[1]
        ) {
          if (!event.conflictingSelectedIds.has(sportEvent.id))
            event.conflictingSelectedIds.add(sportEvent.id);
        }
      }
    });
  };

  const removeDisabledImpactForId = (sportEventId) => {
    allEventsMap.forEach((event) => {
      if (event.conflictingSelectedIds.has(sportEventId)) {
        event.conflictingSelectedIds.delete(sportEventId);
      }
    });
  };

  const handleEventSelect = (sportEvent) => {
    if (selectedIdsSet.size < 3) {
      sportEvent.isSelected = 1;
      allEventsMap.set(sportEvent.id, sportEvent);
      selectedIdsSet.add(sportEvent.id);
      disableConflictingEvents(sportEvent);
      setSelectedIdsSet(new Set(selectedIdsSet));
      setAllEventsMap(new Map(allEventsMap));
    } else {
      alert(SELECT_NO_MORE_THAN_3_EVENTS);
    }
  };

  const handleEventDeselect = (sportEvent) => {
    sportEvent.isSelected = 0;
    allEventsMap.set(sportEvent.id, sportEvent);
    selectedIdsSet.delete(sportEvent.id);
    removeDisabledImpactForId(sportEvent.id);
    setSelectedIdsSet(new Set(selectedIdsSet));
    setAllEventsMap(new Map(allEventsMap));
  };

  return (
    <div class="container-fluid overflow-hidden p-4">
      <div class="row g-4">
        <div class="col">
          <div class="p-4 border bg-light">
            <EventsList
              allEventsMap={allEventsMap}
              onEventSelect={handleEventSelect}
            />
          </div>
        </div>
        {selectedIdsSet && selectedIdsSet.size > 0 && (
          <div class="col">
            <div class="p-4 border bg-light h-100">
              <SelectedEvents
                selectedIdsSet={selectedIdsSet}
                allEventsMap={allEventsMap}
                onEventDeselect={handleEventDeselect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
