export enum EnumPosts {
  ADD_POST = "ADD_POST",
  GET_POSTS = "GET_POSTS",
  SET_ERROR = "SET_ERROR",
}

export interface Author {
  uid?: string | undefined;
  displayName?: string | null | undefined;
  image?: string | null | undefined;
}

export interface Comment {
  id: string;
  message: string;
  author?: Author;
}

export interface Posts {
  id: string;
  title: string;
  url?: string;
  document?: string;
  video?: string;
  author: Author;
  like: number;
  comments?: Comment[];
}

export interface PostsState {
  posts: Posts[] | [];
  error: string;
}

interface SetAddPostAction {
  type: typeof EnumPosts.ADD_POST;
  payload: Posts;
}

interface GetPostsAction {
  type: typeof EnumPosts.GET_POSTS;
  payload: Posts[];
}

interface setErrorAction {
  type: typeof EnumPosts.SET_ERROR;
  payload: string;
}

export type PostsActions = SetAddPostAction | GetPostsAction | setErrorAction;
