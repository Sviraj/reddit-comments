import { ADD_COMMENT, ADD_REPLY, UPVOTE, DOWNVOTE } from "./actions";
import { CommentType, State } from "./types";

const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXEFoxdhUxekM-iQ3hJK9b5MJcgwxVc_cU_g&s';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: State = loadState() || {
  comments: [],
};

const addReplyToComment = (
  comments: CommentType[],
  parentId: string,
  reply: CommentType
): CommentType[] => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, reply] };
    }
    return {
      ...comment,
      replies: addReplyToComment(comment.replies, parentId, reply),
    };
  });
};

const findAndUpdateComment = (
  comments: CommentType[],
  id: string,
  updateFn: (comment: CommentType) => CommentType
): CommentType[] => {
  return comments.map((comment) => {
    if (comment.id === id) {
      return updateFn(comment);
    }
    const updatedReplies = findAndUpdateComment(comment.replies, id, updateFn);
    if (updatedReplies !== comment.replies) {
    }
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
        comments: [
          ...state.comments,
          {
            id: new Date().toISOString(),
            text: action.payload.text,
            upvotes: 0,
            downvotes: 0,
            replies: [],
            username: 'Ariana Grant',
            imgUrl: imgUrl,
          },
        ],
      };
    case ADD_REPLY:
      return {
        ...state,
        comments: addReplyToComment(state.comments, action.payload.parentId, {
          id: new Date().toISOString(),
          text: action.payload.text,
          upvotes: 0,
          downvotes: 0,
          replies: [],
          username: 'Ariana Grant',
          imgUrl: imgUrl,
        }),
      };
    case UPVOTE:
      const upvotedComments = findAndUpdateComment(
        state.comments,
        action.payload.id,
        (comment) => ({
          ...comment,
          upvotes: comment.upvotes + 1,
        })
      );
      return {
        ...state,
        comments: upvotedComments,
      };
    case DOWNVOTE:
      const downvotedComments = findAndUpdateComment(
        state.comments,
        action.payload.id,
        (comment) => ({
          ...comment,
          downvotes: comment.downvotes + 1,
        })
      );
      return {
        ...state,
        comments: downvotedComments,
      };
    default:
      return state;
  }
};

export default reducer;
