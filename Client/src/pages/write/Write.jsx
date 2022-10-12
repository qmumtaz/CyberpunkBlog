import "./write.css";
import React, { useContext, useState }  from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title,setTitle] = useState("");
  const [description,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const {user} = useContext(Context);

 const handleSubmit = async(e) => 
 {
  let config = {
    url: "http://localhost:5000/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    }};
  
  e.preventDefault();
  
  const newpost = { username : user.username , title,description }
  if(file)
  {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename );
    data.append("file",file );
    newpost.photo = filename;
    try 
    {
      await axios.post(`/posts`,data, {
       
      },config);
    } catch (error) 
    {
      
    }
  }
  try 
  {
   const res = await axios.post("/posts", newpost);
   window.location.replace("/post/" + res.data.id);
  } catch (error)
   {
    
  }
  
 }
  return (
    <div className="write">
      {file && (
       <img
       className="writeImg"
       src={URL.createObjectURL(file)}
       alt=""
     />)
      }
     
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange = {(e) => setFile(e.target.files[0])}/>
          <input
            className="writeInput"
            placeholder="Title of your story"
            type="text"
            autoFocus={true}
            onChange = {(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story choom of night city..."
            type="text"
            autoFocus={true}
            onChange = {(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit" >
          Publish
        </button>
      </form>
    </div>
  );
}
