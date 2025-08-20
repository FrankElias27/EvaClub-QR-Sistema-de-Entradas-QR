package com.frank.evaclub.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventResponse {

    private Long eventId;
    private String name;
    private String eventCover;
    private LocalDate eventDate;
    private boolean enabled;
    private boolean defaultLayout;
}
