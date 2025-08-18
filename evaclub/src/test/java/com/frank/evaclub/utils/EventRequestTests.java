package com.frank.evaclub.utils;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record EventRequestTests(
        Long eventId,

        @NotNull(message = "300")
        @NotEmpty(message = "300")
        String name,

        @NotNull(message = "301")
        @NotEmpty(message = "301")
        String eventCover,

        @NotNull(message = "302")
        LocalDateTime eventDate,

        boolean enabled,

        boolean defaultLayout
) {
}
