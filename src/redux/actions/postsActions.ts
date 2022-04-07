import { PostsActions, EnumPosts } from "./../reducers/typesPosts";
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

export const addPost = (
  value: string,
  url: string,
  video: string,
  document: string
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
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
    const postRef = doc(db, "posts", postId);
    const newComments = postComments;

    const newAuthor = {
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      image: auth.currentUser?.photoURL,
    };

    const comment = {
      message: message,
      author: newAuthor,
    };

    newComments.push(comment);

    await updateDoc(postRef, {
      comments: newComments,
    });

    const postsCollection = collection(db, "posts");
    const data = await getDocs(postsCollection);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch(getAddPosts(posts));
  };
};

export const addLike = (
  post: Posts
): ThunkAction<void, RootState, null, PostsActions> => {
  return async (dispatch) => {
    const postDoc = doc(db, "posts", post.id);
    const newField = { like: post.like + 1 };
    await updateDoc(postDoc, newField);

    const postsCollection = collection(db, "posts");
    const data = await getDocs(postsCollection);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch(getAddPosts(posts));
  };
};
