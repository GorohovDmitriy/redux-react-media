import { FC } from "react";
import { useNavigate } from "react-router";
import { FcSettings, FcCancel } from "react-icons/fc";
import { Posts } from "../../redux/reducers/typesPosts";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setRemovePost } from "../../redux/actions/postsActions";

interface PostHeaderProps {
  post: Posts;
}

const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleToPost = () => {
    navigate(`/post/${post.id}/edit`);
  };

  const removePost = () => {
    dispatch(setRemovePost(post.id));
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
};

export default PostHeader;
