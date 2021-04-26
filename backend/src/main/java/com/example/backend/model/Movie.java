package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    Date releaseDate;

    @ManyToMany
    Set<Category> categories;

    @ManyToMany()
    @JoinTable(
            name = "movie_movie_people",
            joinColumns = @JoinColumn(name = "movie_person_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"))
    Set<MoviePerson> moviePeople;

    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    Set<Comments> comments;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Movie)) return false;
        Movie movie = (Movie) o;
        return Objects.equals(getId(), movie.getId()) && Objects.equals(getName(), movie.getName()) && Objects.equals(getDescription(), movie.getDescription()) && Objects.equals(getReleaseDate(), movie.getReleaseDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getReleaseDate());
    }
}
