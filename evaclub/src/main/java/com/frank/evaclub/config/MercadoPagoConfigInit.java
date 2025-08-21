package com.frank.evaclub.config;

import com.mercadopago.MercadoPagoConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MercadoPagoConfigInit {

    @Value("${MP_ACCESS_TOKEN}")
    private String accessToken;

    @PostConstruct
    public void initMercadoPago() {
        MercadoPagoConfig.setAccessToken(accessToken);
    }
}
