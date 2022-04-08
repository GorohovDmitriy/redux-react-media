import React, { ChangeEvent, FC, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Input from "../../UI/Input";

interface NewPostFormProps {
  value: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (event: FormEvent) => void;
  emptyField: boolean;
}

const NewPostForm: FC<NewPostFormProps> = React.memo(
  ({ submitHandler, value, changeHandler, emptyField }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
      <form className="post__form" onSubmit={submitHandler}>
        <img src={`${user?.image}`} alt="User" />
        <Input
          value={value}
          onChange={changeHandler}
          type="text"
          placeholder="Start a post"
          className={!emptyField ? "post__input" : "post__input__empty"}
        />
      </form>
    );
  }
);

NewPostForm.displayName = "NewPostForm";

export default NewPostForm;
