import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FcLikePlaceholder, FcLike, FcComments } from "react-icons/fc";

import PostHeader from "../PostHeader";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";
import ImageView from "../../UI/ImageView";
import VideoView from "../../UI/VideoView";
import EmbedView from "../../UI/EmbedView";

import { Posts, Comment } from "../../redux/reducers/typesPosts";
import { useDispatch } from "react-redux";
import {
  addComments,
  addLike,
  deleteComment,
} from "../../redux/actions/postsActions";

import "./index.scss";

interface PostProps {
  post: Posts;
}

const Post: FC<PostProps> = ({ post }) => {
  const [message, setMessage] = useState("");
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
      <div className="post__icons">
        <div className="post__icons__item">
          {post.like === 0 ? (
            <FcLikePlaceholder size={20} />
          ) : (
            <FcLike size={20} />
          )}
          <p onClick={toggleLike}>{post.like} Like </p>
        </div>
        <div className="post__icons__item">
          <FcComments size={20} />
          <p>Comments {post.comments?.length}</p>
        </div>
      </div>
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
};

export default Post;
