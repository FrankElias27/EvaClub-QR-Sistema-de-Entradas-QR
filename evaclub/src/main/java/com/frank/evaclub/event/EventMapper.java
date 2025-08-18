package com.frank.evaclub.event;

import org.springframework.stereotype.Service;

@Service
public class EventMapper {

    public Event toEvent(EventRequest request) {
        return Event.builder()
                .eventId(request.eventId())
                .name(request.name())
                .eventDate(request.eventDate())
                .enabled(request.enabled())
                .build();
    }

    public EventResponse toEventResponse(Event event) {
        return EventResponse.builder()
                .eventId(event.getEventId())
                .name(event.getName())
                .eventDate(event.getEventDate())
                .enabled(event.isEnabled())
                .build();
    }
}
