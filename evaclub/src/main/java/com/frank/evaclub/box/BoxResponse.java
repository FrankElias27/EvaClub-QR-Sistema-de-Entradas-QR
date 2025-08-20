package com.frank.evaclub.box;

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
public class BoxResponse {

    private Long boxId;
    private String name;
    private String number;
    private String status;
    private Long zoneId;
}
