import { FC, useState } from "react";
import Svg from "../../assets/svg";
import Input from "../../UI/Input";

import { Posts } from "../../redux/reducers/typesPosts";

import "./index.scss";

interface PostProps {
  post: Posts;
}

const Post: FC<PostProps> = ({ post }) => {
  const [popup, setPopup] = useState(false);

  const showPopup = () => {
    setPopup(!popup);
  };

  return (
    <div className="post__box">
      {popup && <div className="post__box__menu">Menu</div>}
      <div className="post__box__user">
        <div className="post__box__avatar">
          <img
            src={`${post.author.image}`}
            alt={`${post.author.displayName}`}
            className="post__box__img"
          />
          <p>{post.author.displayName}</p>
        </div>
        <div className="post__box__edit" onClick={showPopup}>
          <Svg id="edit" />
        </div>
      </div>
      <p className="post__box__title">{post.title}</p>
      {post.url && (
        <img src={post.url} alt="Name" className="post__box__image" />
      )}
      {post.video && (
        <div className="post__box__video">
          <video
            src={post.video}
            width="100%"
            height="80%"
            style={{ borderRadius: "20px" }}
            controls
          />
        </div>
      )}
      {post.document && (
        <div className="post__box__document">
          <embed src={post.document} width="100%" height={500} />
        </div>
      )}
      <div className="post__icons">
        <div className="post__icons__item">
          <Svg id="like" /> <p>Like</p>
        </div>
        <div className="post__icons__item">
          <Svg id="comments" />
          <p>Comments</p>
        </div>
      </div>
      <div className="post__comment">
        <img
          src={`${post.author.image}`}
          alt="Avatar"
          className="post__box__img"
        />
        <div className="post__comment__input">
          <div className="post__comment__input__icons">
            <Svg id="send" />
          </div>
          <Input className="input" type="text" placeholder="add Comment..." />
        </div>
      </div>
    </div>
  );
};

export default Post;
