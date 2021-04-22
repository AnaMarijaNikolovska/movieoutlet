package com.example.backend.repository;

import com.example.backend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Transactional
    List<Movie> findAllByName(String name);

//    @Transactional
//    List<Movie> findAllByActor(MoviePerson moviePerson);

//    @Transactional
//    List<Movie> findAllByCategory(Category category);

    @Transactional
    List<Movie> findAllByReleaseDate(Date releaseDate);


}
