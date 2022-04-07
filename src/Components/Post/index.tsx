import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FcLikePlaceholder,
  FcLike,
  FcSettings,
  FcComments,
} from "react-icons/fc";

import CommentForm from "../CommentForm";
import CommentList from "../CommentList";

import { Posts, Comment } from "../../redux/reducers/typesPosts";
import { useDispatch } from "react-redux";
import { addComments, addLike } from "../../redux/actions/postsActions";

import "./index.scss";

interface PostProps {
  post: Posts;
}

const Post: FC<PostProps> = ({ post }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleToPost = () => {
    navigate(`/post/${post.id}/edit`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const toggleLike = () => {
    dispatch(addLike(post));
  };

  const addCommentInPost = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addComments(message, post.id, post.comments));
    setMessage("");
  };

  return (
    <div className="post__box">
      <div className="post__box__user">
        <div className="post__box__avatar">
          <img
            src={`${post.author.image}`}
            alt={`${post.author.displayName}`}
            className="post__box__img"
          />
          <p>{post.author.displayName}</p>
        </div>
        <div className="post__box__edit" onClick={toggleToPost}>
          <FcSettings size={25} />
        </div>
      </div>
      <p className="post__box__title">{post.title}</p>
      {post.url && (
        <img src={post.url} alt="Name" className="post__box__image" />
      )}
      {post.video && (
        <div className="post__box__video">
          <video src={post.video} width="100%" height="80%" controls />
        </div>
      )}
      {post.document && (
        <div className="post__box__document">
          <embed src={post.document} width="100%" height={500} />
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
      <div className="post__comment">
        <img
          src={`${post.author.image}`}
          alt="Avatar"
          className="post__box__img"
        />
        <CommentForm
          message={message}
          handleChange={handleChange}
          addCommentInPost={addCommentInPost}
        />
      </div>
      {post.comments &&
        post.comments.map((comment: Comment, index: number) => (
          <CommentList key={`${comment.message}__${index}`} comment={comment} />
        ))}
    </div>
  );
};

export default Post;
