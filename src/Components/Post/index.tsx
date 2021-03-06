import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import PostHeader from "../PostHeader";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";
import ImageView from "../../UI/ImageView";
import VideoView from "../../UI/VideoView";
import EmbedView from "../../UI/EmbedView";
import PostIcons from "../PostIcons";

import { Posts, Comment } from "../../redux/reducers/typesPosts";
import { useDispatch, useSelector } from "react-redux";
import {
  addComments,
  addLike,
  deleteComment,
  setErrorPost,
} from "../../redux/actions/postsActions";
import { RootState } from "../../redux/store";

import "./index.scss";

interface PostProps {
  post: Posts;
}

const Post: FC<PostProps> = React.memo(({ post }) => {
  const [message, setMessage] = useState("");
  const { error } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const toggleLike = () => {
    dispatch(addLike(post));
  };

  const addCommentInPost = (event: FormEvent) => {
    event.preventDefault();
    if (message.trim() !== "") {
      dispatch(addComments(message, post.id, post.comments));
      setMessage("");
    }
  };

  const removeComment = (id: string) => {
    dispatch(deleteComment(id, post.comments, post.id));
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setErrorPost(""));
      }
    };
  }, [dispatch, error]);

  return (
    <div className="post__box">
      <PostHeader post={post} />
      <p className="post__box__title">{post.title}</p>
      {post.url && <ImageView url={post.url} className="post__box__image" />}
      {post.video && (
        <div className="post__box__video">
          <VideoView
            video={post.video}
            autoPlay={false}
            width="100%"
            height="80%"
          />
        </div>
      )}
      {post.document && (
        <div className="post__box__document">
          <EmbedView embed={post.document} width="100%" height={500} />
        </div>
      )}
      <PostIcons post={post} toggleLike={toggleLike} />
      <CommentForm
        post={post.author}
        message={message}
        handleChange={handleChange}
        addCommentInPost={addCommentInPost}
      />
      {post.comments &&
        post.comments.map((comment: Comment, index: number) => (
          <CommentList
            key={`${comment.message}__${index}`}
            comment={comment}
            removeComment={removeComment}
          />
        ))}
    </div>
  );
});

Post.displayName = "Post";

export default Post;
