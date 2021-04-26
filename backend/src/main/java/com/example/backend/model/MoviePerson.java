package com.example.backend.model;

import com.example.backend.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoviePerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String surname;

    @ManyToMany(mappedBy = "moviePeople", cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnore
    Set<Movie> movies;

    @Lob
    byte[] picture;

    @Enumerated(EnumType.STRING)
    Role personRole;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MoviePerson)) return false;
        MoviePerson that = (MoviePerson) o;
        return getId().equals(that.getId()) && getName().equals(that.getName()) && getSurname().equals(that.getSurname()) && getPersonRole() == that.getPersonRole();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSurname(), getPersonRole());
    }
}
