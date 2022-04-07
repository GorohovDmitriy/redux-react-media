import { FC } from "react";
import { useNavigate } from "react-router";
import { FcSettings } from "react-icons/fc";
import { Posts } from "../../redux/reducers/typesPosts";

interface PostHeaderProps {
  post: Posts;
}

const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  const navigate = useNavigate();

  const toggleToPost = () => {
    navigate(`/post/${post.id}/edit`);
  };

  return (
    <div className="post__box__user">
      <div className="post__box__avatar">
        <img
          src={`${post.author.image}`}
          alt="User"
          className="post__box__img"
        />
        <p>{post.author.displayName}</p>
      </div>
      <div className="post__box__edit" onClick={toggleToPost}>
        <FcSettings size={25} />
      </div>
    </div>
  );
};

export default PostHeader;
