package com.example.backend.controller;

import com.example.backend.model.Comments;
import com.example.backend.model.dto.CommentDto;
import com.example.backend.service.CommentsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentsController {
    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @GetMapping
    public List<Comments> findAllCategories(){
        return commentsService.findAllComments();
    }

    @GetMapping("/{id}")
    public Optional<Comments> findOneCategory(@PathVariable Long id){
        return commentsService.findOneComment(id);
    }

    @DeleteMapping("/{id}")
    public void deleteComments(@PathVariable Long id){
        commentsService.deleteComment(id);
    }
    @PostMapping
    public Comments addComments(@RequestBody CommentDto commentDto){
        return commentsService.addComment(commentDto);
    }
    @PutMapping("/{id}")
    public Comments editComments(@PathVariable Long id, @RequestBody CommentDto commentDto){
        return commentsService.editComment(commentDto,id);
    }
}
