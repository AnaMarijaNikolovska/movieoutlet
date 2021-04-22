package com.example.backend.service.serviceImpl;

import com.example.backend.model.Comments;
import com.example.backend.model.dto.CommentDto;
import com.example.backend.repository.CommentsRepository;
import com.example.backend.service.CommentsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentsServiceImpl implements CommentsService {
    private final CommentsRepository commentsRepository;

    public CommentsServiceImpl(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    @Override
    public List<Comments> findAllComments() {
        return commentsRepository.findAll();
    }

    @Override
    public Optional<Comments> findOneComment(Long id) {
        return commentsRepository.findById(id);
    }

    @Override
    public Comments addComment(CommentDto commentDto) {
        Comments newComment = new Comments();
        newComment.setText(commentDto.getText());
        return commentsRepository.save(newComment);
    }

    @Override
    public Comments editComment(CommentDto commentDto, Long id) {
        Optional<Comments> optionalComments = findOneComment(id);
        if (optionalComments.isPresent()){
            Comments editComments = optionalComments.get();
            editComments.setText(commentDto.getText());

            return commentsRepository.save(editComments);
        }
        return null;
    }

    @Override
    public void deleteComment(Long id) {
        commentsRepository.deleteById(id);
    }
}
