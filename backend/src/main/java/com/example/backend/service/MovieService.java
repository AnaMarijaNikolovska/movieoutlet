package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.model.dto.MovieDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    List<Movie> findAllMovies();

    Optional<Movie> findOneMovie(Long id);

    Movie addMovie(MovieDto movieDto, MultipartFile moviePicture) throws IOException;

    Movie editMovie(MovieDto movieDto, MultipartFile moviePicture, Long id) throws IOException;

    void deleteMovie(Long id);

    List<Movie> findAllByCategory(Long categoryId);

    List<Movie> findAllByName(String name);

    List<Movie> findAllByReleaseDate(Date releaseDate);

    List<Movie> findAllByActor(Long actorId);
}
