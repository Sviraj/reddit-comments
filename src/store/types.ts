export interface CommentType {
    id: string;
    text: string;
    upvotes: number;
    downvotes: number;
    replies: CommentType[];
    username: string;
    imgUrl: string;
  }
  
  export interface State {
    comments: CommentType[];
  }
  