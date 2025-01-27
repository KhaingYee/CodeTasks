import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Header = ({
  leftIcon,
  title,
  RightIcon = null,
  handleClickleft,
  handleClickRight = null,
}) => {
  return (
    <AppBar position="static" color="#fff">
      <Toolbar>
        {/* Left: Back Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={handleClickleft}>
          {leftIcon}
        </IconButton>

        {/* Center: Title */}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Box>

        {/* Right: Settings Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="settings"
          onClick={handleClickRight}>
          {RightIcon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  leftIcon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  RightIcon: PropTypes.element,
  handleClickleft: PropTypes.func.isRequired,
  handleClickRight: PropTypes.func,
};

export default Header;
