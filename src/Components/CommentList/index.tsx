import { FC } from "react";
import { auth } from "../../firebase";
import { CgClose } from "react-icons/cg";
import { Comment } from "../../redux/reducers/typesPosts";

import ImageView from "../../UI/ImageView";

import "./index.scss";

interface CommentListProps {
  comment: Comment;
  key: string;
  removeComment: (id: string) => void;
}

const CommentList: FC<CommentListProps> = ({ comment, removeComment }) => (
  <div className="list">
    <div className="list__block">
      <ImageView url={`${comment.author?.image}`} className="list__img" />
      <div className="list__message">
        <b>{comment.author?.displayName}</b>
        <p>{comment.message}</p>
      </div>
    </div>
    {auth.currentUser?.uid === comment.author?.uid && (
      <div className="list__delete" onClick={() => removeComment(comment.id)}>
        <CgClose size={15} />
      </div>
    )}
  </div>
);

export default CommentList;
