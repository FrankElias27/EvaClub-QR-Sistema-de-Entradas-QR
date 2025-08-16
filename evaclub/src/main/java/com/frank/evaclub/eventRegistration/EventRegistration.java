package com.frank.evaclub.eventRegistration;

import com.frank.evaclub.common.BaseAuditingEntity;
import com.frank.evaclub.event.Event;
import com.frank.evaclub.qrCode.QrCode;
import com.frank.evaclub.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "event_registration")
public class EventRegistration extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventRegistrationId;
    private LocalDateTime registrationDate;
    private String doorman;
    @Enumerated(EnumType.STRING)
    private EventAttendanceStatus attendanceStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "qr_code_id", nullable = false)
    private QrCode qrCode;
}
