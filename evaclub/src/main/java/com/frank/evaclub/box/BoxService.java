package com.frank.evaclub.box;

import com.frank.evaclub.common.PageResponse;
import com.frank.evaclub.zone.ZoneMapper;
import com.frank.evaclub.zone.ZoneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoxService {

    private final BoxRepository boxRepository;
    private final BoxMapper boxMapper;

    public Long save(BoxRequest request, Authentication connectedUser) {
        Box box = boxMapper.toBox(request);
        return boxRepository.save(box).getBoxId();
    }

    public PageResponse<BoxResponse> findAllBoxes(int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Box> boxes = boxRepository.findAll(pageable);
        List<BoxResponse> boxesResponse = boxes.stream()
                .map(boxMapper::toBoxResponse)
                .toList();

        return new PageResponse<>(
                boxesResponse,
                boxes.getNumber(),
                boxes.getSize(),
                boxes.getTotalElements(),
                boxes.getTotalPages(),
                boxes.isFirst(),
                boxes.isLast()
        );
    }

    public List<BoxResponse> findAllBoxesByZonaAndEvento(Long zonaId, Long eventoId, Authentication connectedUser) {
        List<Box> boxes = boxRepository.findAllByZonaAndEventoEnabled(zonaId, eventoId);
        List<BoxResponse> boxResponses = boxes.stream()
                .map(boxMapper::toBoxResponse)
                .toList();
        return boxResponses;
    }


}
