package com.frank.evaclub.mercadopago;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.frank.evaclub.mercadopago.dtos.CreatePreferenceRequest;
import com.frank.evaclub.mercadopago.dtos.CreatePreferenceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MercadoPagoService {

    @Value("${MP_ACCESS_TOKEN}")
    private String accessToken;

    @Value("${MP_SUCCESS_URL}")
    private String successUrl;

    @Value("${MP_FAILURE_URL}")
    private String failureUrl;

    @Value("${MP_PENDING_URL}")
    private String pendingUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public CreatePreferenceResponse createPreference(CreatePreferenceRequest req) throws Exception {
        String url = "https://api.mercadopago.com/checkout/preferences";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        String currency = (req.currencyId() == null || req.currencyId().isBlank()) ? "PEN" : req.currencyId();

        Map<String, Object> body = Map.of(
                "items", new Object[] {
                        Map.of(
                                "title", req.title(),
                                "quantity", req.quantity(),
                                "unit_price", req.price(),
                                "currency_id", currency
                        )
                },
                "back_urls", Map.of(
                        "success", successUrl,
                        "failure", failureUrl,
                        "pending", pendingUrl
                ),
                "payment_methods", Map.of(
                        "excluded_payment_methods", new Object[] {},
                        "excluded_payment_types", new Object[] {},
                        "default_payment_method_id", "yape"
                ),
                "auto_return", "approved" // necesario para Checkout Pro
        );

        log.info("👉 Enviando a MercadoPago: {}", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(body));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        log.info("📥 Respuesta MercadoPago [{}]: {}", response.getStatusCode(), response.getBody());

        if (response.getStatusCode().is2xxSuccessful()) {
            JsonNode node = mapper.readTree(response.getBody());
            String preferenceId = node.get("id").asText();
            String initPoint = node.get("init_point").asText(); // 🔹 URL Checkout Pro
            return new CreatePreferenceResponse(preferenceId, initPoint);
        }

        throw new RuntimeException("Error creando preferencia: " + response.getStatusCode());
    }

}
