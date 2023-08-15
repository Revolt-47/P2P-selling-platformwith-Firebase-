import { useUserAuth } from "../Context/UserAuthContext";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import CategoryBoxes from "./CategoryBoxes";
import useAddAdToFirebase from "../Context/addAdtoFirbase";
import Featured from "./FeaturedAds";
const HomePage = () => {

  const {getRandomAds} = useAddAdToFirebase()
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

  useEffect(()=>{
     getRandomAds(5)
  })


    return (
      <>
      <Navbar/>
      <div>
        <CategoryBoxes/>
        <Featured/>
      </div>
      </>
    );
  };
  
  export default HomePage;