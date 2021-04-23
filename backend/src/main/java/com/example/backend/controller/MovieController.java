package com.example.backend.controller;

import com.example.backend.model.Movie;
import com.example.backend.model.dto.MovieDto;
import com.example.backend.service.MovieService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> findAllMovies(@RequestParam(required = false, name = "ReleasedDate") Date releasedDate) {
        if (releasedDate != null) {
            return movieService.findAllByReleaseDate(releasedDate);
        }
        return movieService.findAllMovies();
    }

    @GetMapping("/{id}")
    public Optional<Movie> findOneMovie(@PathVariable Long id) {
        return movieService.findOneMovie(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Movie> findAllMoviesByCategory(@PathVariable Long categoryId) {
        return movieService.findAllByCategory(categoryId);
    }

    @GetMapping("/{name}")
    public List<Movie> findAllByName(@PathVariable String name) {
        return movieService.findAllByName(name);
    }

    @GetMapping("/actor/{actorId}")
    public List<Movie> findAllMoviesByActor(@PathVariable Long actorId) {
        return movieService.findAllByActor(actorId);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }

    @PostMapping
    public Movie addMovie(@RequestPart("movieDto") MovieDto movieDto, @RequestPart(value = "moviePicture", required = false) MultipartFile moviePicture) throws IOException {
        return movieService.addMovie(movieDto, moviePicture);
    }

    @PutMapping("/{id}")
    public Movie editMovie(@PathVariable Long id, @RequestPart("movieDto") MovieDto movieDto, @RequestPart(value = "moviePicture", required = false) MultipartFile moviePicture) throws IOException {
        return movieService.editMovie(movieDto, moviePicture, id);
    }


}
