import { useUserAuth } from "../Context/UserAuthContext";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
const HomePage = () => {
  const user1 = useSelector((state) => state.user.user);
  const {user} = useUserAuth();
  const {logout} = useUserAuth();
  const navigate = useNavigate()
  const handlelogout =async () =>{
    try{
      await logout();
      navigate('/')
    }catch(err){
      console.log(err.message)
    }
  }
    return (
      <>
      <Navbar/>
      <div>
        <h1>Welcome, {user1.firstname } {user1.lastname}</h1>
        <Button variant="outlined" onClick={handlelogout}>Log Out</Button>
      </div>
      </>
    );
  };
  
  export default HomePage;