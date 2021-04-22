package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.model.dto.CategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<Category> findAllCategories();

    Optional<Category> findOneCategory(Long id);

    Category addCategory(CategoryDto categoryDto);

    Category editCategory(CategoryDto categoryDto,Long id);

    void deleteCategory(Long id);
}
