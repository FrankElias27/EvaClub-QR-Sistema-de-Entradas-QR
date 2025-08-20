package com.frank.evaclub.zone;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone,Long> {

    Page<Zone> findAll(Pageable pageable);

    List<Zone> findAllByEvent_EventId(Long eventId);
}
