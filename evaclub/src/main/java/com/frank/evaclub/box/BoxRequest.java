package com.frank.evaclub.box;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BoxRequest(

        Long boxId,

        @NotNull(message = "200")
        @NotEmpty(message = "200")
        String name,

        @NotNull(message = "300")
        @NotEmpty(message = "300")
        String number,

        @NotNull(message = "301")
        String status,

        @NotNull(message = "302")
        Long zoneId
) {}
