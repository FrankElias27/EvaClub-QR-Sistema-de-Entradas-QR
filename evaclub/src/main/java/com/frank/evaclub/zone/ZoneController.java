package com.frank.evaclub.zone;

import com.frank.evaclub.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("zones")
@RequiredArgsConstructor
@Tag(name = "Zone")
public class ZoneController {

    private final ZoneService service;

    @PostMapping
    public ResponseEntity<Long> saveZone(
            @Valid @RequestBody ZoneRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping
    public ResponseEntity<PageResponse<ZoneResponse>> findAllZones(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllZones(page, size, connectedUser));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<ZoneResponse>> getZonesByEventId(
            @PathVariable Long eventId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllZonesByEventId(eventId, connectedUser));
    }
}
