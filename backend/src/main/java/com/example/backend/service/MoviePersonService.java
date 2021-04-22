package com.example.backend.service;

import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;

import java.util.List;
import java.util.Optional;

public interface MoviePersonService {

    List<MoviePerson> findAllActors();

    Optional<MoviePerson> findOneActor(Long id);

    MoviePerson addActor(MoviePersonDto moviePersonDto);

    MoviePerson editActor(MoviePersonDto moviePersonDto, Long id);

    Optional<MoviePerson> findByNameOrSurname(String text);

    void deleteActor(Long id);
}
