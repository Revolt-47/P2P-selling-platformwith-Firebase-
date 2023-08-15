import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAddAdToFirebase from "../Context/addAdtoFirbase";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import Conversation from "./Conversation"; // Import your Conversation component
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const { getAdWithId } = useAddAdToFirebase();
  const [product, setProduct] = useState({});
  const [showConversation, setShowConversation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const adData = await getAdWithId(id);
        setProduct(adData);
        setIsLoading(false); // Turn off loading state after fetching data
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false); // Turn off loading state in case of an error
      }
    };

    fetchAdData();
  }, [id, getAdWithId]);

  const openConversation = () => {
    setShowConversation(true);
  };

  const closeConversation = () => {
    setShowConversation(false);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 4, paddingBottom: 8 }}>
        <Paper elevation={3} sx={{ padding: 4, minHeight: "70vh" }}>
          {isLoading ? (
            <CircularProgress sx={{ display: "block", margin: "auto" }} />
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "50vh",
                      objectFit: "contain",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" color="primary">
                    PKR {product.price}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Location: {product.location}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Category: {product.category}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">
                    {product.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%", mt: 2 }}
                    onClick={openConversation}
                  >
                    Contact Seller
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%", mt: 2 }}
                    onClick={() => navigate("/home")}
                  >
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>

      {/* Conversation Popup */}
      <Dialog
        open={showConversation}
        onClose={closeConversation}
        PaperProps={{
          sx: {
            width: "calc(100% - 20px)", // Adjust the width as needed
            position: "fixed",
            bottom: 10,
            right: 10,
            borderRadius: "10px",
          },
        }}
      >
        <DialogContent>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={closeConversation}
          >
            <ArrowBackIcon />
          </IconButton>
          <Conversation adData={product} />
        </DialogContent>
      </Dialog>
    </>
  );
}
