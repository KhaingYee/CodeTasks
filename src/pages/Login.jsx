import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import google_img from "../assets/images/google_img.jpg";
import ApiCollections from "../services/ApiCollections";
import { BASE_URL } from "../api/domain";
import { ApiRequest } from "../services/ApiRequest";
import Loading from "../components/Loading";
import {
  setLoading,
  setToken,
  setUser,
  setError,
} from "../features/auth/authSlice";

const Login = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        dispatch(setLoading(true));
        const userInfoResponse = await axios.get(
          `${BASE_URL}${ApiCollections.login_google}`,
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        dispatch(setToken(tokenResponse.access_token));
        dispatch(setUser(userInfoResponse.data));
        dispatch(setLoading(false));
        navigate("/");
        console.log("Google User Info:", userInfoResponse.data);
      } catch (error) {
        dispatch(setLoading(false));
        // dispatch(setError(error.message));
        dispatch(setError("Login failed. Please try again."));
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      dispatch(setError("Google login failed"));
      toast.error("Google login failed. Please try again.", {
        position: "top-right",
        duration: 3000,
      });
    },
  });

  return (
    <>
      <Container sx={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111927",
            textAlign: "center",
          }}>
          Hi, Welcome Back! 👋
        </Typography>
        <Box
          onClick={handleGoogleLogin}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
            padding: "10px 30px 10px 30px",
            alignItems: "center",
            justifyContent: "space-between",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "90px",
          }}>
          <img
            src={google_img}
            style={{
              width: "26px",
              height: "26px",
              marginRight: "30px",
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#111927",
              textAlign: "center",
            }}>
            Sign-in with Google
          </Typography>
          <Box sx={{ width: "10px" }}></Box>
        </Box>
        {loading && <Loading />}
      </Container>
    </>
  );
};
export default Login;
