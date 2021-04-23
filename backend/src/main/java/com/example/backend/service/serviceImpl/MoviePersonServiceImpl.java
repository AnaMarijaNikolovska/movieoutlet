package com.example.backend.service.serviceImpl;

import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MoviePersonDto;
import com.example.backend.repository.MoviePersonRepository;
import com.example.backend.service.MoviePersonService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MoviePersonServiceImpl implements MoviePersonService {
    private final MoviePersonRepository moviePersonRepository;

    public MoviePersonServiceImpl(MoviePersonRepository moviePersonRepository) {
        this.moviePersonRepository = moviePersonRepository;
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
        moviePersonRepository.deleteById(id);
    }
}
