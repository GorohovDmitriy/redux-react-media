export enum EnumPosts {
  ADD_POST = "ADD_POST",
  GET_POSTS = "GET_POSTS",
}

export interface Author {
  uid?: string | null;
  displayName?: string | null;
  image?: string | null;
}

export interface Posts {
  id: string;
  title: string;
  url?: string;
  document?: string;
  video?: string;
  author: Author;
}

export interface PostsState {
  posts: Posts[] | [];
}

interface SetAddPostAction {
  type: typeof EnumPosts.ADD_POST;
  payload: Posts;
}

interface GetPostsAction {
  type: typeof EnumPosts.GET_POSTS;
  payload: Posts[];
}

export type PostsActions = SetAddPostAction | GetPostsAction;
