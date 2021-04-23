package com.example.backend.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MovieDto {
    String name;

    Long[] categoriesId;

    Long[] actorsId;

    Date releaseDate;

    String description;
}
