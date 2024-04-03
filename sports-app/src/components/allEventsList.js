import React from "react";
import { ALL_EVENTS, CONFLICTING_EVENT, SELECT } from "../constants";

const EventsList = ({ allEventsMap, onEventSelect }) => {
  return (
    <>
      <h2 class="mb-4 text-center">
        <u>{ALL_EVENTS}</u>
      </h2>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        {Array.from(allEventsMap.values())
          .filter((sportEvent) => !sportEvent.isSelected)
          .sort((a, b) => a.event_category.localeCompare(b.event_category))
          .map((sportEvent) => (
            <div class="col" key={sportEvent.id}>
              <div class="card border-secondary">
                <h6
                  class={`card-header border-secondary ${
                    sportEvent.conflictingSelectedIds.size > 0
                      ? "text-secondary"
                      : ""
                  }`}
                >
                  {sportEvent.event_category}
                  {"  "}
                  {sportEvent.conflictingSelectedIds.size > 0 ? (
                    <span class="badge rounded-pill bg-danger">
                      {CONFLICTING_EVENT}
                    </span>
                  ) : (
                    ""
                  )}
                </h6>
                <div
                  class={`card-body ${
                    sportEvent.conflictingSelectedIds.size > 0
                      ? "text-secondary"
                      : ""
                  }`}
                >
                  <h5 class="card-title">{sportEvent.event_name}</h5>
                  <p class="card-text">{sportEvent.startDate}</p>
                  <p class="card-text">
                    {sportEvent.startTime} - {sportEvent.endTime}
                  </p>
                  <button
                    class={`btn btn-primary w-75 ${
                      sportEvent.conflictingSelectedIds.size > 0
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => onEventSelect(sportEvent)}
                  >
                    {SELECT}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EventsList;
