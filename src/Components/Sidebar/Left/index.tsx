import React, { FC } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Posts } from "../../../redux/reducers/typesPosts";
import { RootState } from "../../../redux/store";

import "./index.scss";

const Left: FC = React.memo(() => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);

  const postsCount = posts.filter(
    (post: Posts) => post.author.uid === user?.uid
  );

  return (
    <div className="left">
      <div className="left__content">
        <img src={`${user?.image}`} alt="User" className="left__image" />
        <p className="left__username">{user?.displayName}</p>
        <Link to="/account">
          <p className="left__email">View Profile</p>
        </Link>
      </div>
      <div className="left__my-post">
        <p>My posts</p>
        <p>{postsCount.length}</p>
      </div>
    </div>
  );
});

export default Left;
