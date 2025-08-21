package com.frank.evaclub.mercadopago.dtos;

public class CreatePreferenceResponse {
    private String id;
    private String initPoint;

    public CreatePreferenceResponse(String id, String initPoint) {
        this.id = id;
        this.initPoint = initPoint;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getInitPoint() { return initPoint; }
    public void setInitPoint(String initPoint) { this.initPoint = initPoint; }
}
