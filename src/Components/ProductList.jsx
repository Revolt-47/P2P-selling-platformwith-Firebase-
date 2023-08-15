import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import useAddAdToFirebase from "../Context/addAdtoFirbase";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductList() {
  const { category } = useParams();
  const { getAdsWithCategory } = useAddAdToFirebase();
  const [adData, setAdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ads = await getAdsWithCategory(category);
      if (ads) {
        setTimeout(() => {
          setAdData(ads);
          setIsLoading(false);
        }, 2000); // Wait for 2 seconds
      }
    };

    fetchData();
  }, [category, getAdsWithCategory]);

  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 4, paddingBottom: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          {category.toLocaleUpperCase()}
        </Typography>
        <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : adData.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ color: "red" }}>
              No ads available in this category.
            </Typography>
          ) : (
            <Grid container spacing={6}>
              {adData.map((ad) => (
                <Grid item xs={12} sm={6} md={4} key={ad.id}>
                  <Link to={`/products/${ad.id}`} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%", // Make boxes same height
                      "&:hover": {
                        backgroundColor: "lightblue",
                        opacity: 0.9,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%", // Ensure images have consistent width
                        paddingBottom: "100%", // Maintain a 1:1 aspect ratio
                        overflow: "hidden",
                        height: "5vh",
                      }}
                    >
                      <img
                        src={ad.image}
                        alt={ad.title}
                        style={{
                          width: "100%",
                          height: "1200%",
                          objectFit: "cover", // Maintain the aspect ratio and cover the box
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom
                      sx={{ mt: 2, fontWeight: "bold" }}
                    >
                      {ad.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ color: "#007185" }}
                    >
                      Location: {ad.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ color: "#B12704", mt: 1 }}
                    >
                      Price: {ad.price}
                    </Typography>
                  </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Suspense>
      </Container>
    </>
  );
}

function LoadingSpinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <CircularProgress />
    </Box>
  );
}
