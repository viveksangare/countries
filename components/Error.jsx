import React from "react";
import { Container, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate(); // Used for navigation
  const error = useRouteError();
  
  const handleBackHome = () => {
    navigate("/"); // Navigate back to home page
  };

  console.log("error",error)
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "24px",
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        {error.status} - {error.statusText}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {/* {error.error.message} */}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackHome}
        sx={{ textTransform: "none", px: 4 }}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default Error;
