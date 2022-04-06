import { EnumPosts, PostsState, PostsActions } from "./typesPosts";

const initialState: PostsState = {
  posts: [],
};

export const postsReducer = (state = initialState, action: PostsActions) => {
  switch (action.type) {
    case EnumPosts.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case EnumPosts.GET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    default:
      return state;
  }
};
