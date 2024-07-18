// src/App.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addReply, upvote, downvote } from './store/actions';
import CommentList from './componenets/CommentList';
import CommentForm from './componenets/CommentForm';
import { State } from './store/types';

const App: React.FC = () => {
  const comments = useSelector((state: State) => state.comments);
  const dispatch = useDispatch();

  const handleAddComment = (text: string) => {
    dispatch(addComment(text));
  };

  const handleAddReply = (text: string, parentId: string) => {
    dispatch(addReply(text, parentId));
  };

  const handleUpvote = (id: string) => {
    dispatch(upvote(id));
  };

  const handleDownvote = (id: string) => {
    dispatch(downvote(id));
  };

  return (
    <div className="App">
      <h4>Discussion</h4>
      <CommentForm addComment={handleAddComment} />
      <CommentList comments={comments} addReply={handleAddReply} upvote={handleUpvote} downvote={handleDownvote} />
    </div>
  );
};

export default App;
