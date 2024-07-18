// src/store/actions.ts
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

export const addComment = (text: string) => ({
  type: ADD_COMMENT,
  payload: { text }
});

export const addReply = (text: string, parentId: string) => ({
  type: ADD_REPLY,
  payload: { text, parentId }
});

export const upvote = (id: string) => ({
  type: UPVOTE,
  payload: { id }
});

export const downvote = (id: string) => ({
  type: DOWNVOTE,
  payload: { id }
});
