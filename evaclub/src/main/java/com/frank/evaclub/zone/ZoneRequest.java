package com.frank.evaclub.zone;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record ZoneRequest(


        Long id,

        @NotNull(message = "200")
        @NotEmpty(message = "200")
        String name,

        @NotNull(message = "201")
        @Positive(message = "201")
        Double price,

        @NotNull(message = "202")
        @PositiveOrZero(message = "202")
        Integer columns,

        @NotNull(message = "203")
        Long eventId
) {
}
