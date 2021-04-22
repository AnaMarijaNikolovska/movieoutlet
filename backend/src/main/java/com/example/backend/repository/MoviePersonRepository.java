package com.example.backend.repository;

import com.example.backend.model.MoviePerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface MoviePersonRepository extends JpaRepository<MoviePerson,Long> {
    @Transactional
    Optional<MoviePerson> findByNameOrSurname(String name, String surname);
}
