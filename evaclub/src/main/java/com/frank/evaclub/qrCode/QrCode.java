package com.frank.evaclub.qrCode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.frank.evaclub.common.BaseAuditingEntity;
import com.frank.evaclub.eventRegistration.EventRegistration;
import com.frank.evaclub.payment.Payment;
import com.frank.evaclub.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "qr_codes")
public class QrCode extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qrCodeId;
    private LocalDateTime generationDate;
    private boolean used;
    @Column(nullable = false, unique = true, length = 2000)
    private String qrValue;


    @OneToOne(mappedBy = "qrCode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private EventRegistration qrRegistrations;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(mappedBy = "qrCode", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Payment payment;


}
