package com.car.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.car.dto.Board;
import com.car.dto.Comment;
import com.car.persistence.CommentRepository;
import com.car.service.CommentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

	private final CommentRepository commentRepository;
	
	@Override
	public void save(Comment comment) {
		
		commentRepository.save(comment);
		
	}

	@Override
	public Comment findComment(Long boardId, String userId) {
		
		
		Optional<Comment> comment = commentRepository.findAllByBoardIdAndUserId(boardId,userId);
		
		if(!comment.isPresent()) {
			return null;	
		}else {
			return comment.get();	
		}
	}

	@Override
	public List<Comment> findComment(Long boardId) {
		
		List<Comment> comment = commentRepository.findAllByBoardId(boardId);
		System.out.println(comment);
		if(comment.isEmpty()) {
			return null;	
		}else {
			return comment;	
		}
	}

	@Override
	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
		
	}

}
