package com.frank.evaclub.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.frank.evaclub.common.BaseAuditingEntity;
import com.frank.evaclub.eventRegistration.EventRegistration;
import com.frank.evaclub.payment.Payment;
import com.frank.evaclub.qrCode.QrCode;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "users")
@NamedQuery(name = UserConstants.FIND_USER_BY_EMAIL,
        query = "SELECT u FROM User u WHERE u.email = :email"
)
public class User extends BaseAuditingEntity {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String dni;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<EventRegistration> userRegistrations  = new HashSet<>();


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<QrCode> qrCodes = new HashSet<>();


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Payment> payments = new HashSet<>();


}
