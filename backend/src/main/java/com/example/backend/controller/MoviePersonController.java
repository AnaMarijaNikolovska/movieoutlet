package com.example.backend.controller;

import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;
import com.example.backend.service.MoviePersonService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movie-persons")
public class MoviePersonController {
    private final MoviePersonService moviePersonService;

    public MoviePersonController(MoviePersonService moviePersonService) {
        this.moviePersonService = moviePersonService;
    }

    @GetMapping()
    public List<MoviePerson> findAllActors() {
        return moviePersonService.findAllActors();
    }

    @GetMapping("/{id}")
    public Optional<MoviePerson> findOneActor(@PathVariable Long id) {
        return moviePersonService.findOneActor(id);
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id) {
        moviePersonService.deleteActor(id);
    }

    @PostMapping
    public MoviePerson addActor(@RequestPart("moviePersonDto") MoviePersonDto moviePersonDto, @RequestPart(value = "moviePersonPhoto", required = false) MultipartFile moviePersonPhoto) throws IOException {
        return moviePersonService.addActor(moviePersonDto, moviePersonPhoto);
    }

    @PutMapping("/{id}")
    public MoviePerson editActor(@PathVariable Long id, @RequestPart("moviePersonDto") MoviePersonDto moviePersonDto, @RequestPart(value = "moviePersonPhoto", required = false) MultipartFile moviePersonPhoto) throws IOException {
        return moviePersonService.editActor(moviePersonDto, moviePersonPhoto, id);
    }

    @GetMapping("/search")
    public Optional<MoviePerson> findActorByNameOrSurname(@RequestParam("Actor") String text) {
        return moviePersonService.findByNameOrSurname(text);
    }
}
