import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { Comment, Posts } from "../../redux/reducers/typesPosts";
import { addComments } from "../../redux/actions/postsActions";

import CommentList from "../../Components/CommentList";
import CommentForm from "../../Components/CommentForm";

import "./index.scss";

const SinglPostPage: FC = React.memo(() => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { posts } = useSelector((state: RootState) => state.posts);

  const currentPost = posts.find((post: Posts) => post.id === id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const addCommentInPost = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(addComments(message, currentPost?.id, currentPost?.comments));
    setMessage("");
  };

  return (
    <div className="single">
      <div>
        <img src={`${currentPost?.author.image}`} alt="AAA" />
        <p>{currentPost?.author.displayName}</p>
      </div>
      <p>{currentPost?.title}</p>
      {currentPost?.url && (
        <img
          src={currentPost?.url}
          className="single__img"
          alt="aa"
          width="100%"
          height="90%"
        />
      )}
      {currentPost?.video && (
        <div>
          <video src={currentPost?.video} width="100%" height="80%" controls />
        </div>
      )}
      {currentPost?.document && (
        <div>
          <embed src={currentPost.document} width="100%" height={500} />
        </div>
      )}
      <hr />
      <CommentForm
        addCommentInPost={addCommentInPost}
        message={message}
        handleChange={handleChange}
      />
      {currentPost?.comments?.map((comment: Comment, index: number) => (
        <CommentList key={`${comment.message}__${index}`} comment={comment} />
      ))}
    </div>
  );
});

export default SinglPostPage;
