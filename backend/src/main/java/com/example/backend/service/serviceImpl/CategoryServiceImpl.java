package com.example.backend.service.serviceImpl;

import com.example.backend.model.Category;
import com.example.backend.model.dto.CategoryDto;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
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

        if(optionalCategory.isPresent()){
            Category category = optionalCategory.get();

            category.setName(categoryDto.getName());
            category.setDescription(categoryDto.getDescription());

            return categoryRepository.save(category);
        }

        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
