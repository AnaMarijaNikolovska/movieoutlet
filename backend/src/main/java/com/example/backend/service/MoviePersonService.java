package com.example.backend.service;

import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MoviePersonService {

    List<MoviePerson> findAllActors();

    Optional<MoviePerson> findOneActor(Long id);

    MoviePerson addActor(MoviePersonDto moviePersonDto, MultipartFile moviePersonPhoto) throws IOException;

    MoviePerson editActor(MoviePersonDto moviePersonDto, MultipartFile moviePersonPhoto, Long id) throws IOException;

    Optional<MoviePerson> findByNameOrSurname(String text);

    void deleteActor(Long id);
}
