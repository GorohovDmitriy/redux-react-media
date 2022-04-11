import React, { FC } from "react";
import { FcLikePlaceholder, FcLike, FcComments } from "react-icons/fc";

interface PostIconsProps {
  post: any;
  toggleLike: () => void;
}

const PostIcons: FC<PostIconsProps> = ({ post, toggleLike }) => {
  return (
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
  );
};

export default PostIcons;
