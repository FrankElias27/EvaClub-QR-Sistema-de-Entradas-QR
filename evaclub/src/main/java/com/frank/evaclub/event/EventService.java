package com.frank.evaclub.event;
import com.frank.evaclub.box.Box;
import com.frank.evaclub.box.BoxRepository;
import com.frank.evaclub.box.BoxStatus;
import com.frank.evaclub.zone.Zone;
import com.frank.evaclub.zone.ZoneRepository;
import org.springframework.transaction.annotation.Transactional;

import com.frank.evaclub.common.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final ZoneRepository zoneRepository;
    private final BoxRepository boxRepository;
    private final EventMapper eventMapper;

    public Long save(EventRequest request, Authentication connectedUser) {
        Event event = eventMapper.toEvent(request);
        return eventRepository.save(event).getEventId();
    }

    public PageResponse<EventResponse> findAllEvents(int page, int size, Authentication connectedUser) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Event> events = eventRepository.findAll(pageable);
        List<EventResponse> eventResponse = events.stream()
                .map(eventMapper::toEventResponse)
                .toList();
        return new PageResponse<>(
                eventResponse,
                events.getNumber(),
                events.getSize(),
                events.getTotalElements(),
                events.getTotalPages(),
                events.isFirst(),
                events.isLast()
        );
    }

    @Transactional
    public EventResponse saveEventDefault(EventRequest request, Authentication connectedUser) {
        Event event = eventMapper.toEvent(request);
        Event saved = eventRepository.save(event);

        if (request.defaultLayout()) {
            Arrays.stream(DefaultLayoutEvent.values())
                    .forEach(layout -> {
                        Zone zone = Zone.builder()
                                .name(event.getName() + " - " + layout.getDisplayName())
                                .price(0.0)
                                .columns(layout.getColumns())
                                .event(saved)
                                .build();
                        zoneRepository.save(zone);

                        IntStream.rangeClosed(1, layout.getCapacity())
                                .forEach(i -> {
                                    Box box = Box.builder()
                                            .name(event.getName() + " - " + layout.getDisplayName())
                                            .number(generateBoxNumber())
                                            .status(BoxStatus.AVAILABLE)
                                            .zone(zone)
                                            .build();
                                    boxRepository.save(box);
                                });
                    });
        }

        return eventMapper.toEventResponse(saved);
    }

    private String generateBoxNumber() {
        Random random = new Random();
        return String.format("%04d-%03d-%04d-%03d",
                random.nextInt(10000),
                random.nextInt(1000),
                random.nextInt(10000),
                random.nextInt(1000));
    }

    public Long findActiveEventId(Authentication connectedUser) {
        List<Event> activeEvents = eventRepository.findByEnabledTrue();

        if (activeEvents.isEmpty()) {
            throw new IllegalStateException("No hay un evento activo en este momento");
        }

        if (activeEvents.size() > 1) {
            throw new IllegalStateException("Existe más de un evento activo, revise la configuración");
        }

        return activeEvents.get(0).getEventId();
    }
}
