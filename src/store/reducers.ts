// src/store/reducers.ts
//import { createStore } from 'redux';
import { ADD_COMMENT, ADD_REPLY, UPVOTE, DOWNVOTE } from './actions';
import { CommentType, State } from './types';

// const initialState: State = {
//   comments: []
// };

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  const saveState = (state: State) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // Ignore write errors.
    }
  };

  const initialState: State = loadState() || {
    comments: []
  };

const addReplyToComment = (comments: CommentType[], parentId: string, reply: CommentType): CommentType[] => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, reply] };
    }
    return { ...comment, replies: addReplyToComment(comment.replies, parentId, reply) };
  });
};


// Recursive function to find and update a comment for upvoting or downvoting
const findAndUpdateComment = (comments: CommentType[], id: string, updateFn: (comment: CommentType) => CommentType): CommentType[] => {
  console.log('comments', comments);
  console.log('id', id);
  console.log('findAndUpdateComment called with id:', id);
  return comments.map(comment => {
    console.log('processing comment', comment);
    console.log('Processing comment with id:', comment.id);
    console.log(comment.id === id);
    console.log(typeof comment.id)
    console.log(typeof id)
    if (comment.id === id) {
      console.log('If this if statement work');
      console.log('Updating comment with id:', id);
      return updateFn(comment);
    }
    const updatedReplies = findAndUpdateComment(comment.replies, id, updateFn);
    if (updatedReplies !== comment.replies) {
      console.log('Updated replies for comment with id:', comment.id);
    }
    console.log('updatedReplies', updatedReplies);
    return {
      ...comment,
      replies: updatedReplies,
    };
  });
};


const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, { id: new Date().toISOString(), text: action.payload.text, upvotes: 0, downvotes: 0, replies: [] }]
      };
    case ADD_REPLY:
      return {
        ...state,
        comments: addReplyToComment(state.comments, action.payload.parentId, { id: new Date().toISOString(), text: action.payload.text, upvotes: 0, downvotes: 0, replies: [] })
      };
      case UPVOTE:
        console.log('UPVOTE action triggered for id:', action.payload.id);
        console.log('sending details', state.comments, action.payload.id);
        const upvotedComments = findAndUpdateComment(state.comments, action.payload.id, comment => ({
          ...comment,
          upvotes: comment.upvotes + 1,
        }));
        console.log('Updated comments after upvote:', upvotedComments);
        return {
          ...state,
          comments: upvotedComments,
        };
      case DOWNVOTE:
        console.log('DOWNVOTE action triggered for id:', action.payload.id);
        const downvotedComments = findAndUpdateComment(state.comments, action.payload.id, comment => ({
          ...comment,
          downvotes: comment.downvotes + 1,
        }));
        console.log('Updated comments after downvote:', downvotedComments);
        return {
          ...state,
          comments: downvotedComments,
        };
    default:
      return state;
  }
};

// const store = createStore(reducer);
// store.subscribe(() => {
//   saveState(store.getState());
// });

export default reducer;
