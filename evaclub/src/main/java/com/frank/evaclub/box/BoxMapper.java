package com.frank.evaclub.box;

import com.frank.evaclub.zone.Zone;
import org.springframework.stereotype.Service;

@Service
public class BoxMapper {

    public Box toBox(BoxRequest request) {
        return Box.builder()
                .boxId(request.boxId())
                .name(request.name())
                .number(request.number())
                .status(request.status() != null ? BoxStatus.valueOf(request.status()) : BoxStatus.AVAILABLE)
                .zone(Zone.builder()
                        .zoneId(request.zoneId())
                        .build())
                .build();
    }

    public BoxResponse toBoxResponse(Box box) {
        return BoxResponse.builder()
                .boxId(box.getBoxId())
                .name(box.getName())
                .number(box.getNumber())
                .status(box.getStatus() != null ? box.getStatus().name() : null)
                .build();
    }
}
