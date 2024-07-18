// src/components/CommentForm.tsx
import React, { useState } from "react";

interface CommentFormProps {
  addComment: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() === "") {
      setError("The field is required and cannot be empty");
    } else {
      addComment(text);
      setText("");
      setError("");
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.trim()) {
              setError("");
            }
          }}
          placeholder="Add a comment..."
        />
        <div className="form-footer">
          <p className={`error ${error ? "visible" : ""}`}>{error}</p>
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
