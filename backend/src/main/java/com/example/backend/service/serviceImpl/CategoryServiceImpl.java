package com.example.backend.service.serviceImpl;

import com.example.backend.model.Category;
import com.example.backend.model.Movie;
import com.example.backend.model.dto.CategoryDto;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final MovieRepository movieRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, MovieRepository movieRepository) {
        this.categoryRepository = categoryRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findOneCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category addCategory(CategoryDto categoryDto) {

        Category newCategory = new Category();
        newCategory.setName(categoryDto.getName());
        newCategory.setDescription(categoryDto.getDescription());

        return categoryRepository.save(newCategory);
    }

    @Override
    public Category editCategory(CategoryDto categoryDto, Long id) {

        Optional<Category> optionalCategory = findOneCategory(id);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            category.setName(categoryDto.getName());
            category.setDescription(categoryDto.getDescription());

            return categoryRepository.save(category);
        }

        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = findOneCategory(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Set<Movie> categoryMovies = category.getMovies();
        categoryMovies.forEach(movie -> {
            Set<Category> movieCategories = movie.getCategories();
            movieCategories.remove(category);
            movieRepository.save(movie);
        });

        categoryRepository.deleteById(id);
    }
}
