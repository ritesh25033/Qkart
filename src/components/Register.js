import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setconfirmPassword] = useState("");
  const history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */


  const register = async (formData) => {
    try {
      const data = {
        username: formData.username,
        password: formData.password
      }
      const response = await axios.post(`${config.endpoint}/auth/register`, data);
      // console.log(response);
      if (response.status === 201) {
        history.push("/login")
        enqueueSnackbar('Registered successfully', { variant: 'success' });
        // Optionally, clear form data after successful registration
        // resetForm();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable, and returns valid JSON.', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Something went wrong. Check your network connection and try again.', { variant: 'error' });
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;

    if (!username) {
      enqueueSnackbar('Username is a required field', { variant: 'error' });
      return false;
    }

    if (username.length < 6) {
      enqueueSnackbar('Username must be at least 6 characters', { variant: 'error' });
      return false;
    }

    if (!password) {
      enqueueSnackbar('Password is a required field', { variant: 'error' });
      return false;
    }

    if (password.length < 6) {
      enqueueSnackbar('Password must be at least 6 characters', { variant: 'error' });
      return false;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return false;
    }

    return true;
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };
    console.log(formData);
    if (validateInput(formData)) {
      register(formData);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={username}
            onChange={handleUsername}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={handlePassword}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
           <Button className="button" variant="contained"  onClick={handleSubmit}
  type="submit">
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="/login">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
