package com.frank.evaclub.mercadopago.dtos;

public record CreatePreferenceRequest(
        String title,
        Integer quantity,
        Double price,
        String productId,
        String currencyId
) {}
