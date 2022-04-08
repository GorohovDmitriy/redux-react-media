import React, { FC, useEffect } from "react";

import Post from "../../Components/Post";

import { Posts } from "../../redux/reducers/typesPosts";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "../../redux/actions/postsActions";

import "./index.scss";

const HomePage: FC = React.memo(() => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(setAllPost());
  }, [dispatch]);

  return (
    <div className="home">
      {posts &&
        posts
          .map((post: Posts, index: number) => (
            <Post key={`${post.title}__${index}`} post={post} />
          ))
          .reverse()}
    </div>
  );
});

export default HomePage;
