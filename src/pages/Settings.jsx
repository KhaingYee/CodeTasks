import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={handleBackClick}
        sx={{
          flexShrink: 0,
          left: 10,
          position: "fixed",
        }}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ alignContent: "center" }}>
        <h1>Welcome, {user.name}</h1>
        <Typography>Email: {user.email}</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogOut}
          aria-label="Log out"
          sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
