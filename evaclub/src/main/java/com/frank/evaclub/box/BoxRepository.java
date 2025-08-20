package com.frank.evaclub.box;

import com.frank.evaclub.event.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoxRepository extends JpaRepository<Box,Long> {

    Page<Box> findAll(Pageable pageable);

    @Query("""
       SELECT b
       FROM Box b
       WHERE b.zone.id = :zoneId
       AND b.zone.event.id = :eventId
       AND b.zone.event.enabled = true
       """)
    List<Box> findAllByZonaAndEventoEnabled(@Param("zoneId") Long zonaId,
                                            @Param("eventId") Long eventoId);
}
