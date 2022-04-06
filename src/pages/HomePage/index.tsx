import React, { FC, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import Post from "../../Components/Post";

import { Posts } from "../../redux/reducers/typesPosts";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAddPosts } from "../../redux/actions/postsActions";

import "./index.scss";

const HomePage: FC = React.memo(() => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    (async () => {
      const postsCollection = collection(db, "posts");
      const data = await getDocs(postsCollection);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getAddPosts(posts));
    })();
  }, []);

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
