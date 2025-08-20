package com.frank.evaclub.zone;

import com.frank.evaclub.common.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ZoneService {

    private final ZoneRepository zoneRepository;
    private final ZoneMapper zoneMapper;

    public Long save(ZoneRequest request, Authentication connectedUser) {
        Zone zone = zoneMapper.toZone(request);
        return zoneRepository.save(zone).getZoneId();
    }

    public PageResponse<ZoneResponse> findAllZones(int page, int size, Authentication connectedUser) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Zone> zones = zoneRepository.findAll(pageable);
        List<ZoneResponse> zonesResponse = zones.stream()
                .map(zoneMapper::toZoneResponse)
                .toList();
        return new PageResponse<>(
                zonesResponse,
                zones.getNumber(),
                zones.getSize(),
                zones.getTotalElements(),
                zones.getTotalPages(),
                zones.isFirst(),
                zones.isLast()
        );
    }

    public List<ZoneResponse> findAllZonesByEventId(Long eventId, Authentication connectedUser) {
        List<Zone> zones = zoneRepository.findAllByEvent_EventId(eventId);
        List<ZoneResponse> zoneResponses = zones.stream()
                .map(zoneMapper::toZoneResponse)
                .toList();
        return zoneResponses;
    }



}
