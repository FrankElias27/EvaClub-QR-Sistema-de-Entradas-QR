package com.frank.evaclub.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.frank.evaclub.common.BaseAuditingEntity;
import com.frank.evaclub.eventRegistration.EventRegistration;
import jakarta.persistence.*;
import lombok.*;
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
@Table(name = "events")
public class Event extends BaseAuditingEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;
    private String name;
    private String eventCover;
    private LocalDateTime eventDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean enabled;

    @OneToMany(mappedBy = "event",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<EventRegistration> eventRegistrations  = new HashSet<>();

}
