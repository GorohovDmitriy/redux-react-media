import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { Comment, Posts } from "../../redux/reducers/typesPosts";
import { addComments } from "../../redux/actions/postsActions";

import CommentList from "../../Components/CommentList";
import CommentForm from "../../Components/CommentForm";
import ImageView from "../../UI/ImageView";
import VideoView from "../../UI/VideoView";
import EmbedView from "../../UI/EmbedView";

import "./index.scss";

const SinglPostPage: FC = React.memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [message, setMessage] = useState("");
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
      <div className="single__user">
        <img src={`${currentPost?.author.image}`} alt="User" />
        <p>{currentPost?.author.displayName}</p>
      </div>
      <p>{currentPost?.title}</p>
      {currentPost?.url && (
        <ImageView
          className="single__img"
          url={currentPost.url}
          width="100%"
          height="90%"
        />
      )}
      {currentPost?.video && (
        <div className="single__video">
          <VideoView
            video={currentPost.video}
            width="100%"
            height="80%"
            controls
          />
        </div>
      )}
      {currentPost?.document && (
        <EmbedView embed={currentPost.document} width="100%" height={500} />
      )}
      <hr />
      <CommentForm
        post={currentPost?.author}
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
