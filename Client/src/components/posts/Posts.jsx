import Post from "../post/Post";
import React from "react";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="postsss">
      {posts && posts.map((p) => <Post post={p} />)}{" "}    </div>
  );
}
