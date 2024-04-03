import React from "react";
import { SELECTED_EVENTS, REMOVE } from "../constants";

const SelectedEvents = ({ selectedIdsSet, allEventsMap, onEventDeselect }) => {
  return (
    <>
      <h2 class="mb-4 text-center">
        <u>{SELECTED_EVENTS}</u>
      </h2>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        {[...selectedIdsSet].map((selectedId) => {
          const sportEvent = allEventsMap.get(selectedId);
          return (
            <div class="col" key={sportEvent.id}>
              <div class="card border-secondary">
                <h6 class="card-header border-secondary">
                  {sportEvent.event_category}
                </h6>
                <div class="card-body">
                  <h5 class="card-title">{sportEvent.event_name}</h5>
                  <p class="card-text">{sportEvent.startDate}</p>
                  <p class="card-text">
                    {sportEvent.startTime} - {sportEvent.endTime}
                  </p>
                  <button
                    class="btn btn-primary w-75"
                    onClick={() => onEventDeselect(sportEvent)}
                  >
                    {REMOVE}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectedEvents;
