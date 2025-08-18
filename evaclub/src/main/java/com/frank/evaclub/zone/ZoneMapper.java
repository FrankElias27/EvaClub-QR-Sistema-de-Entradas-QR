package com.frank.evaclub.zone;

import com.frank.evaclub.event.Event;
import org.springframework.stereotype.Service;

@Service
public class ZoneMapper {

    public Zone toZone(ZoneRequest request) {
        return Zone.builder()
                .zoneId(request.id())
                .name(request.name())
                .price(request.price())
                .rows(request.rows())
                .event(Event.builder()
                        .eventId(request.eventId())
                        .enabled(false)
                        .build()
                        )
                .build();
    }

    public ZoneResponse toZoneResponse(Zone zone) {
        return ZoneResponse.builder()
                .id(zone.getZoneId())
                .name(zone.getName())
                .price(zone.getPrice())
                .rows(zone.getRows())
                .build();
    }
}
