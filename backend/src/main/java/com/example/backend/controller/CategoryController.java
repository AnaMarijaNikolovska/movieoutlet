package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.model.dto.CategoryDto;
import com.example.backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> findAllCategories(){
        return categoryService.findAllCategories();
    }

    @GetMapping("/{id}")
    public Optional<Category> findOneCategory(@PathVariable Long id){
        return categoryService.findOneCategory(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
    @PostMapping
    public Category addCategory(@RequestBody CategoryDto categoryDto){
        return categoryService.addCategory(categoryDto);
    }
    @PutMapping("/{id}")
    public Category editCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto){
        return categoryService.editCategory(categoryDto,id);
    }
}
