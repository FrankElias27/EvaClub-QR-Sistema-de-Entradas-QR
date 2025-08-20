package com.frank.evaclub.box;

import com.frank.evaclub.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("boxes")
@RequiredArgsConstructor
@Tag(name = "Box")
public class BoxController {

    private final BoxService service;

    @PostMapping
    public ResponseEntity<Long> saveBox(
            @Valid @RequestBody BoxRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BoxResponse>> findAllBoxes(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllBoxes(page, size, connectedUser));
    }
}
