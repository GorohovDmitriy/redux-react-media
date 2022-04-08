import { PostsActions, EnumPosts, Comment } from "./../reducers/typesPosts";
import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import { Posts } from "../reducers/typesPosts";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export const setAllPost = (): ThunkAction<
  void,
  RootState,
  null,
  PostsActions
> => {
  return async (dispatch) => {
    try {
      const postsCollection = collection(db, "posts");
      const data = await getDocs(postsCollection);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getAddPosts(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteComment = (
  id: string,
  postComments: any,
  postId: any
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
    try {
      const commentRef = doc(db, "posts", postId);
      let delteteCom = postComments;
      const newComments = delteteCom.filter(
        (comment: Comment) => comment.id !== id
      );

      await updateDoc(commentRef, {
        comments: newComments,
      });
      dispatch(setAllPost());
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPost = (
  value: string,
  url: string,
  video: string,
  document: string
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
    try {
      const postCollection = collection(db, "posts");
      const post = await addDoc(postCollection, {
        title: value,
        author: {
          uid: auth.currentUser?.uid,
          displayName: auth.currentUser?.displayName,
          image: auth.currentUser?.photoURL,
        },
        url: url,
        video: video,
        document: document,
        like: 0,
        comments: [],
      });

      dispatch(
        setAddPost({
          id: post.id,
          title: value,
          url: url,
          video: video,
          document: document,
          like: 0,
          comments: [],
          author: {
            uid: auth.currentUser?.uid,
            displayName: auth.currentUser?.displayName,
            image: auth.currentUser?.photoURL,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const addComments = (
  message: string,
  postId: any,
  postComments: any
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
    try {
      const postRef = doc(db, "posts", postId);
      const newComments = postComments;

      const newAuthor = {
        uid: auth.currentUser?.uid,
        displayName: auth.currentUser?.displayName,
        image: auth.currentUser?.photoURL,
      };

      const comment = {
        id: String(Date.now()),
        message: message,
        author: newAuthor,
      };

      newComments.push(comment);

      await updateDoc(postRef, {
        comments: newComments,
      });

      dispatch(setAllPost());
    } catch (error) {
      console.log(error);
    }
  };
};

export const addLike = (
  post: Posts
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
    try {
      const postDoc = doc(db, "posts", post.id);
      const newPost = { like: post.like + 1 };
      await updateDoc(postDoc, newPost);

      dispatch(setAllPost());
    } catch (error) {
      console.log(error);
    }
  };
};
