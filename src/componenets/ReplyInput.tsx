// src/components/ReplyInput.tsx
import React, { useState } from 'react';
import '../styles/ReplyInput.scss'; // Import your SCSS styles

interface ReplyInputProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ onSubmit, onCancel }) => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // if(replyText.trim() === ''){
    //     setError('Reply can not be Empty');
    // }else{
    //     onSubmit(replyText);
    //     setReplyText('');
    //     setError('');
    // }
    if (replyText.trim()) {
      onSubmit(replyText);
      setReplyText('');
      setError('');
    }else{
        setError('Reply can not be Empty');
    }
  };

  return (
    <div className="reply-input">
      <input
        value={replyText}
        onChange={(e) => {
            setReplyText(e.target.value)
            if (e.target.value.trim()) {
                setError('');
              }
        }}
        placeholder="Add a reply ..."
      />
      {error && <div className='error-message'>{error}</div>}
      <button onClick={onCancel} className="cancel-button">Cancel</button>
      <button onClick={handleSubmit} className="submit-button">Comment</button>
      
    </div>
  );
};

export default ReplyInput;
