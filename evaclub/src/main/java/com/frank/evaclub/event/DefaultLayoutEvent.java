package com.frank.evaclub.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DefaultLayoutEvent {

    PALCO_PLATINUM("PALCO PLATINUM", 1,5),
    PLATINUM_BOX_IZQUIERDA("PLATINUM BOX IZQUIERDA", 1,6),
    PLATINUM_BOX_DERECHA("PLATINUM BOX DERECHA",1, 7),
    MESA_PLATINUM("MESA PLATINUM",4 ,12),
    BOX_VIP_IZQUIERDA("BOX VIP IZQUIERDA",1, 8),
    BOX_VIP_DERECHA("BOX VIP DERECHA",1, 8),
    SUPER_VIP("SUPER VIP",4, 16),
    MESA_VIP("MESA VIP", 6,36),
    MEZZANINE_CENTRAL("MEZZANINE CENTRAL",5, 15);

    private final String displayName;
    private final int columns;
    private final int capacity;
}
