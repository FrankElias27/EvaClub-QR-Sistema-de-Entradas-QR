package com.frank.evaclub.event;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record EventRequest(
        Long eventId,

        @NotNull(message = "300")
        @NotEmpty(message = "300")
        String name,

        @NotNull(message = "301")
        @NotEmpty(message = "301")
        String eventCover,

        @NotNull(message = "302")
        LocalDate eventDate,

        boolean enabled,

        boolean defaultLayout
) {
}
