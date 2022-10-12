import "./settings.css";
import React, { useContext }  from "react";
import { Context } from "../../context/Context";
import { useState } from "react";
import axios from "axios";
export default function Settings() {
  
  const [file,setFile] = useState(null);
  const [username,setUsername] = useState("");  

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [sucess,setSucess] = useState(false);
  const {user , dispatch} = useContext(Context);
  const pf = "http://localhost:5000/images/";


const updateSettings = async(e) => 
 {
  e.preventDefault();
  dispatch({type:"UPDATE_START"})
  const updateuser = { userid : user.id ,  username,email,password}
  if(file)
  {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename );
    data.append("file",file );
    updateuser.profilepic = filename;
    try 
    {
      await axios.post("/user",data, {
        url: "http://localhost:5000/api",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      
    } catch (error) 
    {
      
    }

  }
  try 
  {
   const res =  await axios.put("/user/"+ user.id,updateuser, {
    url: "http://localhost:5000/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
    setSucess(true);
    dispatch({type:"UPDATE_SUCCESS",payload: res.data })
   
  } catch (error)
   {
    dispatch({type:"UPDATE_FAILURE"})
  }
}

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>

        <form className="settingsForm" onSubmit={updateSettings}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : pf+user.profilepic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange = {(e) => setFile(e.target.files[0])}
            />
          </div>
          
     
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e =>setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={e =>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="" name="password" onChange={e =>setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {sucess && <span style={{color: "#00E6F6" , textAlign : "center" , marginTop:"10px"}}>Profile has been updated..</span>}
        </form>
      </div>
    </div>
  );
}
