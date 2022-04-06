import { PostsActions, EnumPosts } from "./../reducers/typesPosts";
import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import { Posts } from "../reducers/typesPosts";

export const setAddPost = (
  post: Posts
): ThunkAction<void, RootState, null, PostsActions> => {
  return (dispatch) => {
    dispatch({
      type: EnumPosts.ADD_POST,
      payload: post,
    });
  };
};

export const getAddPosts = (
  posts: any
): ThunkAction<void, RootState, null, PostsActions> => {
  return (dispatch) => {
    dispatch({
      type: EnumPosts.GET_POSTS,
      payload: posts,
    });
  };
};
