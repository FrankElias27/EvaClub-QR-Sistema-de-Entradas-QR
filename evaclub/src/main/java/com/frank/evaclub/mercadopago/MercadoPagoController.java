package com.frank.evaclub.mercadopago;

import com.frank.evaclub.mercadopago.dtos.CreatePreferenceRequest;
import com.frank.evaclub.mercadopago.dtos.CreatePreferenceResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("mp")
@RequiredArgsConstructor
@Tag(name = "MercadoPago")
public class MercadoPagoController {

    private final MercadoPagoService service;

    @PostMapping("/create-preference")
    public ResponseEntity<CreatePreferenceResponse> createPreference(@RequestBody CreatePreferenceRequest req) throws Exception {
        return ResponseEntity.ok(service.createPreference(req));
    }
}