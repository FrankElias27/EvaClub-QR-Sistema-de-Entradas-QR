package com.frank.evaclub.box;

import com.frank.evaclub.event.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoxRepository extends JpaRepository<Box,Long> {

    Page<Box> findAll(Pageable pageable);
}
