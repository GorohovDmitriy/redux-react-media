import { FC } from "react";
import { auth } from "../../firebase";
import { CgClose } from "react-icons/cg";
import { Comment } from "../../redux/reducers/typesPosts";

import "./index.scss";

interface CommentListProps {
  comment: Comment;
}

const CommentList: FC<CommentListProps> = ({ comment }) => {
  return (
    <div className="list">
      <div className="list__block">
        <img
          className="list__img"
          src={`${comment.author?.image}`}
          alt="User"
        />
        <div className="list__message">
          <b>{comment.author?.displayName}</b>
          <p>{comment.message}</p>
        </div>
      </div>
      {auth.currentUser?.uid === comment.author?.uid && (
        <div className="list__delete">
          <CgClose size={15} />
        </div>
      )}
    </div>
  );
};

export default CommentList;