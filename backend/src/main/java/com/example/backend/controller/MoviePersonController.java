package com.example.backend.controller;

import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;
import com.example.backend.service.MoviePersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/actors")
public class MoviePersonController {
    private final MoviePersonService moviePersonService;

    public MoviePersonController(MoviePersonService moviePersonService) {
        this.moviePersonService = moviePersonService;
    }

    @GetMapping()
    public List<MoviePerson> findAllActors(){
        return moviePersonService.findAllActors();
    }

    @GetMapping("/{id}")
    public Optional<MoviePerson> findOneActor(@PathVariable Long id){
        return moviePersonService.findOneActor(id);
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id){
        moviePersonService.deleteActor(id);
    }

    @PostMapping
    public MoviePerson addActor(@RequestBody MoviePersonDto moviePersonDto){
        return moviePersonService.addActor(moviePersonDto);
    }

    @PutMapping("/{id}")
    public MoviePerson editActor(@PathVariable Long id, @RequestBody MoviePersonDto moviePersonDto){
        return moviePersonService.editActor(moviePersonDto,id);
    }

    @GetMapping("/search")
    public Optional<MoviePerson> findActorByNameOrSurname(@RequestParam("Actor") String text){
        return moviePersonService.findByNameOrSurname(text);
    }
}
