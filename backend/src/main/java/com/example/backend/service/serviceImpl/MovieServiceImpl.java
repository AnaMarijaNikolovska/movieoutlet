package com.example.backend.service.serviceImpl;

import com.example.backend.model.Category;
import com.example.backend.model.Movie;
import com.example.backend.model.MoviePerson;
import com.example.backend.model.dto.MovieDto;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.service.MoviePersonService;
import com.example.backend.service.MovieService;
import com.sun.istack.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final MoviePersonService moviePersonService;
    private final CategoryService categoryService;

    public MovieServiceImpl(MovieRepository movieRepository, MoviePersonService moviePersonService, CategoryService categoryService) {
        this.movieRepository = movieRepository;
        this.moviePersonService = moviePersonService;
        this.categoryService = categoryService;
    }

    @Override
    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> findOneMovie(Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Movie addMovie(MovieDto movieDto, MultipartFile moviePicture) throws IOException {

        Movie newMovie = mapDtoToMovie(movieDto, null);
        if (moviePicture != null) {
            newMovie.setPicture(moviePicture.getBytes());
        }

        return movieRepository.save(newMovie);
    }

    @Override
    public Movie editMovie(MovieDto movieDto, MultipartFile moviePicture, Long id) throws IOException {

        Movie movie = mapDtoToMovie(movieDto, id);
        if (moviePicture != null) {
            movie.setPicture(moviePicture.getBytes());
        }

        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> findAllByCategory(Long categoryId) {

        Optional<Category> category = categoryService.findOneCategory(categoryId);

        if (category.isPresent()){
            Category category1 = category.get();
//            return movieRepository.findAllByCategory(category1);
            return null;
        }
        return null;
    }

    @Override
    public List<Movie> findAllByName(String name) {
        return movieRepository.findAllByName(name);
    }

    @Override
    public List<Movie> findAllByReleaseDate(Date releaseDate) {
        return movieRepository.findAllByReleaseDate(releaseDate);
    }

    @Override
    public List<Movie> findAllByActor(Long actorId) {
        Optional<MoviePerson> actor = moviePersonService.findOneActor(actorId);
        if (actor.isPresent()){
            MoviePerson moviePerson1 = actor.get();
//            return  movieRepository.findAllByActor(moviePerson1);
            return null;
        }
        return null;
    }

    private Movie mapDtoToMovie(MovieDto movieDto, @Nullable Long id) {

        Movie movie = new Movie();

        if (id != null) {
            movie = findOneMovie(id).get();
        }
        Set<MoviePerson> movieMoviePeople = new HashSet<>();

        for (Long actorId : movieDto.getActorsId()) {
            Optional<MoviePerson> actor = moviePersonService.findOneActor(actorId);

            if (actor.isPresent()) {
                MoviePerson foundMoviePerson = actor.get();
                movieMoviePeople.add(foundMoviePerson);
            }
        }

        movie.setMoviePeople(movieMoviePeople);

        Set<Category> movieCategories = new HashSet<>();
        for (Long categoriesId : movieDto.getCategoriesId()) {
            Optional<Category> category = categoryService.findOneCategory(categoriesId);

            if (category.isPresent()) {
                Category foundCategories = category.get();
                movieCategories.add(foundCategories);
            }
        }
        movie.setCategories(movieCategories);
        movie.setDescription(movieDto.getDescription());
        movie.setName(movieDto.getName());
        movie.setReleaseDate(movieDto.getReleaseDate());
        return movie;
    }
}
