import React, { useState } from "react";
import { CommentType } from "../store/types";
import { FaRegCommentDots } from "react-icons/fa";
import { BiUpvote, BiDownvote } from "react-icons/bi";

interface CommentProps {
  comment: CommentType;
  addReply: (text: string, parentId: string) => void;
  upvote: (id: string) => void;
  downvote: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  addReply,
  upvote,
  downvote,
}) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setshowReplyInput] = useState(false);
  const [error, setError] = useState("");
  const [oneclick, setOneclick]= useState(true);

  const handleReply = () => {
    if (replyText.trim() === "") {
      setError("Reply can not be empty");
    } else {
      addReply(replyText, comment.id);
      setReplyText("");
      setshowReplyInput(false);
    }
  };

  const onCancel = () => {
    setshowReplyInput(false);
  };

  const handleUpvote = () => {
    if(oneclick){
    upvote(comment.id);
    setOneclick(false);
    }
  };

  const handleDownvote = () => {
    downvote(comment.id);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={comment.imgUrl}
          alt={comment.username}
          className="user-icon"
        />
        <span className="username">{comment.username}</span>
        <p className="descrip-text"> 0 points. less than a minute age.</p>
      </div>
      <p className="comment-text">{comment.text}</p>
      <div className="button-container">
          <button onClick={() => handleUpvote()}>
          <BiUpvote className="updownvote-button" />
        </button>
        <span>{comment.upvotes}</span>
        <button onClick={() => handleDownvote()}>
          <BiDownvote className="updownvote-button" />
        </button>
        <span>{comment.downvotes}</span>
        <button className="updownvote-button" onClick={() => setshowReplyInput(!showReplyInput)}>
          <FaRegCommentDots className="reply-icon" />
          {showReplyInput ? "" : "Reply"}
        </button>
      </div>
      {showReplyInput && (
        <div className="reply-input">
          <input
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
              if (e.target.value.trim()) {
                setError("");
              }
            }}
            placeholder="Add a reply ..."
          />
          <div className="reply-footer">
            {error && <div className="error-message">{error}</div>}
            <button onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleReply} className="submit-button">
              Comment
            </button>
          </div>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addReply={addReply}
              upvote={upvote}
              downvote={downvote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
