// src/components/CommentList.tsx
import React from 'react';
import Comment from './Comment';
import { CommentType } from '../store/types';

interface CommentListProps {
  comments: CommentType[];
  addReply: (text: string, parentId: string) => void;
  upvote: (id: string) => void;
  downvote: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, addReply, upvote, downvote }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} addReply={addReply} upvote={upvote} downvote={downvote} />
      ))}
    </div>
  );
};

export default CommentList;
