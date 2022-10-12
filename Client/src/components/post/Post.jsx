import { Link } from "react-router-dom";
import React from "react";
import "./post.css";

export default function Post({ post }) {
  const pf = "http://localhost:5000/images/";
  return (
    <div className="post">
      <img className="postImg" src={pf + post.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories && post.categories.map((c) => (
            <span className="postCat">{c.name} </span>
          ))}
        </div>
        <Link to={`/post/${post.id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
