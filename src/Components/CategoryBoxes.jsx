import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SportsIcon from '@mui/icons-material/Sports';
import FaceIcon from '@mui/icons-material/Face';
import LaptopIcon from '@mui/icons-material/Laptop';
import MobileIcon from '@mui/icons-material/PhoneAndroid';
import ClothesIcon from '@mui/icons-material/ShoppingBag';
import JewelryIcon from '@mui/icons-material/LocalOffer';
import ShoesIcon from '@mui/icons-material/LocalMall';
import CarIcon from '@mui/icons-material/DriveEta';
import HouseIcon from '@mui/icons-material/House';
import { Link } from 'react-router-dom';

const CategoryBoxes = () => {
  const categories = [
    { name: 'Sports', icon: <SportsIcon /> },
    { name: 'Cosmetics', icon: <FaceIcon /> },
    { name: 'Accessories', icon: <LaptopIcon /> },
    { name: 'Mobiles', icon: <MobileIcon /> },
    { name: 'Clothes', icon: <ClothesIcon /> },
    { name: 'Jewelry', icon: <JewelryIcon /> },
    { name: 'Shoes', icon: <ShoesIcon /> },
    { name: 'Cars', icon: <CarIcon /> },
    { name: 'Houses', icon: <HouseIcon /> },
  ];
  return (
    <Box>
      <Typography variant="h2" component="h2" align="center" mt={2} style={{ paddingBottom: "1vh" }}>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.name}>
            <Link to={`/productlist/${category.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="120px"
                border="1px solid #ccc"
                borderRadius="8px"
                p={2}
                sx={{
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    opacity: [0.9, 0.8, 0.7],
                    cursor: 'pointer',
                  },
                }}
              >
                <Box>{category.icon}</Box>
                <Typography variant="body2" component="p" align="center">
                  {category.name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryBoxes;
