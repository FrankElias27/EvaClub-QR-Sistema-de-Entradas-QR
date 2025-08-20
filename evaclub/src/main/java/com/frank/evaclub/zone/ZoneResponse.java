package com.frank.evaclub.zone;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZoneResponse {

    private Long id;
    private String name;
    private Double price;
    private Integer columns;
    private Long eventId;
}
