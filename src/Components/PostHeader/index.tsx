import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { FcSettings, FcCancel } from "react-icons/fc";
import { Posts } from "../../redux/reducers/typesPosts";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setErrorPost, setRemovePost } from "../../redux/actions/postsActions";
import { RootState } from "../../redux/store";

import ImageView from "../../UI/ImageView";

interface PostHeaderProps {
  post: Posts;
}

const PostHeader: FC<PostHeaderProps> = React.memo(({ post }) => {
  const { error } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleToPost = () => {
    navigate(`/post/${post.id}/edit`);
  };

  const removePost = () => {
    dispatch(setRemovePost(post.id));
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setErrorPost(""));
      }
    };
  }, [dispatch, error]);

  return (
    <div className="post__box__user">
      <div className="post__box__avatar">
        <ImageView url={`${post.author.image}`} className="post__box__img" />
        <p>{post.author.displayName}</p>
      </div>
      <div className="post__box__block">
        {auth.currentUser?.uid === post.author.uid && (
          <div className="post__box__delete" onClick={removePost}>
            <FcCancel size={25} />
          </div>
        )}
        <div className="post__box__edit" onClick={toggleToPost}>
          <FcSettings size={25} />
        </div>
      </div>
    </div>
  );
});

PostHeader.displayName = "PostHeader";

export default PostHeader;
