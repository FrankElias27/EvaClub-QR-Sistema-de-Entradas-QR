package com.frank.evaclub.zone;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.frank.evaclub.box.Box;
import com.frank.evaclub.common.BaseAuditingEntity;
import com.frank.evaclub.event.Event;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "zones")
public class Zone extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long zoneId;
    private String name;
    private Double price;
    private Integer rows;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @OneToMany(mappedBy = "zone",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Box> box  = new HashSet<>();
}
