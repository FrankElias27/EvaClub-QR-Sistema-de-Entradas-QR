package com.frank.evaclub.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DefaultLayoutEvent {

    PALCO_PLATINUM("PALCO PLATINUM", 5),
    PLATINUM_BOX_IZQUIERDA("PLATINUM BOX IZQUIERDA", 6),
    PLATINUM_BOX_DERECHA("PLATINUM BOX DERECHA", 7),
    MESA_PLATINUM("MESA PLATINUM", 12),
    BOX_VIP_IZQUIERDA("BOX VIP IZQUIERDA", 8),
    BOX_VIP_DERECHA("BOX VIP DERECHA", 8),
    SUPER_VIP("SUPER VIP", 16),
    MESA_VIP("MESA VIP", 36),
    MEZZANINE_CENTRAL("MEZZANINE CENTRAL", 15);

    private final String displayName;
    private final int capacity;
}
