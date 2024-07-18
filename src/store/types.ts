export interface CommentType {
    id: string;
    text: string;
    upvotes: number;
    downvotes: number;
    replies: CommentType[];
  }
  
  export interface State {
    comments: CommentType[];
  }
  