import { useUserAuth } from "../Context/UserAuthContext";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
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
      <div>
        <h1>Welcome, {user.email}!</h1>
        <Button variant="outlined" onClick={handlelogout}>Log Out</Button>
      </div>
    );
  };
  
  export default HomePage;