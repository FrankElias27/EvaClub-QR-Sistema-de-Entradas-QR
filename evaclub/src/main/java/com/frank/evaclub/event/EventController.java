package com.frank.evaclub.event;

import com.frank.evaclub.common.PageResponse;
import com.frank.evaclub.zone.ZoneRequest;
import com.frank.evaclub.zone.ZoneResponse;
import com.frank.evaclub.zone.ZoneService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("events")
@RequiredArgsConstructor
@Tag(name = "events")
public class EventController {

    private final EventService service;

    @PostMapping
    public ResponseEntity<Long> saveEvent(
            @Valid @RequestBody EventRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping
    public ResponseEntity<PageResponse<EventResponse>> findAllEvents(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllEvents(page, size, connectedUser));
    }
}
