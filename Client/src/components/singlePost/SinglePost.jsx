import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const pf = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [updatepost, setUpdatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  let config = {
    url: "http://localhost:5000/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    }};
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post.id}`, {
        data: { username: user.username },
      },config
      );
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post.id}`, {
        username: user.username,
        title,
        description,
      },config);
      setUpdatePost(true);
    } catch (error) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    };
    getPost();
  }, config , [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={pf + post.photo} alt="" />
        {updatepost ? (
          <input
            type="text"
            value={title}
            className="updateTitle"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdatePost(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatepost ? (
          <textarea
            type="text"
            className="updatedesc"
            value={description}
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updatepost && (
          <button className="updatesumbit" onClick={handleUpdate()}>
            Publish
          </button>
        )}
      </div>
    </div>
  );
}
