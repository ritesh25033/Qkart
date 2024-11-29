import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  let userName = localStorage.getItem("username");
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (

    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon" />
      </Box>
      {children}
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push('/')}
        >
          Back to explore
        </Button>
      ) : (
        !userName ? (
          
          <Stack direction="row">
            <Button variant="text" onClick={() => history.push('/login')}>Login</Button>
            <Button variant="contained" onClick={() => history.push('/register')}>Register</Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt={userName} src="/public/avatar.png" />
            <p >{userName}</p>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </Stack>
        )
      )}
    </Box>
  );
};

export default Header;
