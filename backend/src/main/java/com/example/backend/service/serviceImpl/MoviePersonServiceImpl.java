package com.example.backend.service.serviceImpl;

import com.example.backend.model.Movie;
import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;
import com.example.backend.model.enums.Role;
import com.example.backend.repository.MoviePersonRepository;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.MoviePersonService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MoviePersonServiceImpl implements MoviePersonService {
    private final MoviePersonRepository moviePersonRepository;
    private final MovieRepository movieRepository;

    public MoviePersonServiceImpl(MoviePersonRepository moviePersonRepository, MovieRepository movieRepository) {
        this.moviePersonRepository = moviePersonRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public List<MoviePerson> findAllActors() {
        return moviePersonRepository.findAll();
    }

    @Override
    public Optional<MoviePerson> findOneActor(Long id) {
        return moviePersonRepository.findById(id);
    }

    @Override
    public MoviePerson addActor(MoviePersonDto moviePersonDto, MultipartFile moviePersonPhoto) throws IOException {
        MoviePerson newMoviePerson = new MoviePerson();
        newMoviePerson.setName(moviePersonDto.getName());
        newMoviePerson.setSurname(moviePersonDto.getSurname());
        Role role = Role.valueOf(moviePersonDto.getPersonRole());
        newMoviePerson.setPersonRole(role);

        if (moviePersonPhoto != null) {
            newMoviePerson.setPicture(moviePersonPhoto.getBytes());
        }

        return moviePersonRepository.save(newMoviePerson);
    }

    @Override
    public MoviePerson editActor(MoviePersonDto moviePersonDto, MultipartFile moviePersonPhoto, Long id) throws IOException {

        Optional<MoviePerson> optionalActor = findOneActor(id);

        if (optionalActor.isPresent()) {
            MoviePerson moviePerson1 = optionalActor.get();
            moviePerson1.setName(moviePersonDto.getName());
            moviePerson1.setSurname(moviePersonDto.getSurname());
            Role role = Role.valueOf(moviePersonDto.getPersonRole());
            moviePerson1.setPersonRole(role);

            if (moviePersonPhoto != null) {
                moviePerson1.setPicture(moviePersonPhoto.getBytes());
            }

            return moviePersonRepository.save(moviePerson1);
        }
        return null;
    }

    @Override
    public Optional<MoviePerson> findByNameOrSurname(String text) {
        return moviePersonRepository.findByNameOrSurname(text, text);
    }

    @Override
    public void deleteActor(Long id) {
        MoviePerson moviePerson = findOneActor(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Set<Movie> personMovies = moviePerson.getMovies();
        personMovies.forEach(movie -> {
            Set<MoviePerson> movieCrew = movie.getMoviePeople();
            movieCrew.remove(movie);
            movieRepository.save(movie);
        });

        moviePersonRepository.deleteById(id);
    }
}
