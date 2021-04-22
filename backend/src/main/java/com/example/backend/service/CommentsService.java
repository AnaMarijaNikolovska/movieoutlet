package com.example.backend.service;

import com.example.backend.model.Comments;
import com.example.backend.model.dto.CommentDto;

import java.util.List;
import java.util.Optional;

public interface CommentsService {

    List<Comments> findAllComments();

    Optional<Comments> findOneComment(Long id);

    Comments addComment(CommentDto commentDto);

    Comments editComment(CommentDto commentDto,Long id);

    void deleteComment(Long id);
}
