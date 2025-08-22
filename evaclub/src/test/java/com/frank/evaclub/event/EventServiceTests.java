package com.frank.evaclub.event;

import com.frank.evaclub.box.Box;
import com.frank.evaclub.box.BoxRepository;
import com.frank.evaclub.utils.EventRequestTests;
import com.frank.evaclub.zone.ZoneRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;



@ExtendWith(MockitoExtension.class)
public class EventServiceTests {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private ZoneRepository zoneRepository;

    @Mock
    private BoxRepository boxRepository;

    @Mock
    private EventMapper eventMapper;

    @InjectMocks
    private EventService eventService;

    @Test
    void saveEventDefault() {
        // Given
        EventRequest request = new EventRequest(
                null,
                "Evento Test",
                "cover.jpg",
                LocalDate.now(),
                true,
                true
        );

        Event event = Event.builder().eventId(null).name("Evento Test").enabled(true).build();
        Event savedEvent = Event.builder().eventId(1L).name("Evento Test").enabled(true).build();
        EventResponse response = EventResponse.builder().eventId(1L).name("Evento Test").enabled(true).build();

        when(eventMapper.toEvent(request)).thenReturn(event);
        when(eventRepository.save(event)).thenReturn(savedEvent);
        when(eventMapper.toEventResponse(savedEvent)).thenReturn(response);

        // When
        EventResponse result = eventService.saveEventDefault(request, null);

        // Then
        assertNotNull(result);
        assertEquals(savedEvent.getEventId(), result.getEventId());


        InOrder inOrder = inOrder(zoneRepository, boxRepository);

        for (DefaultLayoutEvent layout : DefaultLayoutEvent.values()) {

            inOrder.verify(zoneRepository).save(argThat(zone ->
                    zone.getName().equals(savedEvent.getName() + " - " + layout.getDisplayName()) &&
                            zone.getEvent().getEventId().equals(savedEvent.getEventId())
            ));


            inOrder.verify(boxRepository, times(layout.getCapacity())).save(any(Box.class));
        }


        int totalCapacity = Arrays.stream(DefaultLayoutEvent.values())
                .mapToInt(DefaultLayoutEvent::getCapacity)
                .sum();
        verify(boxRepository, times(totalCapacity)).save(any(Box.class));
    }


}
