import { ChangeEvent, FC, FormEvent } from "react";
import { FcCheckmark } from "react-icons/fc";
import { auth } from "../../firebase";

import Input from "../../UI/Input";

interface CommentFormProps {
  addCommentInPost?: (event: FormEvent) => void;
  message?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  post: any;
}

const CommentForm: FC<CommentFormProps> = ({
  addCommentInPost,
  message,
  handleChange,
  post,
}) => {
  return (
    <div className="post__comment">
      <img
        src={`${auth.currentUser?.photoURL}`}
        alt="Avatar"
        className="post__box__img"
      />
      <form className="post__comment__input" onSubmit={addCommentInPost}>
        <div className="post__comment__input__icons" onClick={addCommentInPost}>
          <FcCheckmark size={25} />
        </div>
        <Input
          className="input"
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="add Comment..."
        />
      </form>
    </div>
  );
};

export default CommentForm;
