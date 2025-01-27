import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Footer = ({ title, handleClick }) => {
  return (
    <AppBar
      position="absolute"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#fff",
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.1)",
      }}>
      <Toolbar>
        <Box
          onClick={handleClick}
          sx={{
            flexGrow: 1,
            textAlign: "center",
            cursor: "pointer",
            color: "#0A56BB",
          }}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Footer;
