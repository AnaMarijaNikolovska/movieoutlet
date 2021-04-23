package com.example.backend.model;

import com.example.backend.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @ManyToMany
    Set<Movie> movies;

    @Lob
    byte[] picture;

    @Enumerated(EnumType.STRING)
    Role personRole;
}
