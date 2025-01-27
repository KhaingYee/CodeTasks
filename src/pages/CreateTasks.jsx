import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowBack } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { BASE_URL } from "../api/domain";
import ApiCollections from "../services/ApiCollections";
import { ApiRequest } from "../services/ApiRequest";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import SwitchButton from "../components/SwitchButton";
import { FormatDate } from "../utils/FormatDate";

const CreateTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    status: true,
    start_date: new Date(),
    end_date: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleClick = () => {
    navigate(-1);
  };
  const handleChange = (event) => {
    setTasks({ ...tasks, [event.target.id]: event.target.value });
  };

  const handleStatus = () => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      status: !prevTasks.status,
    }));
  };

  const handleStartDateChange = (date) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      start_date: date,
    }));
  };

  const handleEndDateChange = (date) => {
    if (date < tasks.start_date) {
      toast.error("End date cannot be earlier than start date!", {
        position: "top-right",
      });
      return;
    }
    setTasks((prevTasks) => ({
      ...prevTasks,
      end_date: date,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let requestObj = {
      method: "post",
      url: `${BASE_URL}${ApiCollections.task_create}`,
      params: {
        title: tasks.title,
        description: tasks.description,
        status: tasks.status,
        start_date: FormatDate(tasks.start_date),
        end_date: FormatDate(tasks.end_date),
      },
    };
    console.log("formData", requestObj);
    let response = await ApiRequest(requestObj);
    console.log("response", response);
    setLoading(false);
    if (response.data.code === 200) {
      toast.success("Create Successfully", {
        position: "top-right",
      });
      navigate("/");
    } else {
      setLoading(false);
      toast.error(response.message, {
        position: "top-right",
      });
      toast.error(
        "Please you can see console formData and response data, why i can not join google tasks api",
        {
          position: "top-right",
        }
      );
      setErrors(response.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      <Header
        leftIcon={<ArrowBack />}
        title="Create Tasks"
        handleClickleft={handleClick}
      />

      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          flexGrow: 1,
          overflowY: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "70px",
        }}>
        <Grid item xs={12} sm={12} md={12}>
          <Stack
            spacing={3}
            style={{
              marginTop: 15,
              marginBottom: 15,
              backgroundColor: "white",
              padding: "20px",
              borderRadius: 10,
            }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 3, sm: 2 }}>
              <Input
                type="text"
                label="Title"
                handleChange={handleChange}
                id="title"
                value={tasks.title}
                error={errors?.title}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 3, sm: 2 }}>
              <Input
                type="text"
                label="Description"
                handleChange={handleChange}
                id="description"
                value={tasks.description}
                error={errors?.description}
                multiline
                rows={4}
              />
            </Stack>
          </Stack>
          <Box
            sx={{
              marginBottom: "15px",
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography variant="title">Notification</Typography>
            <SwitchButton checked={tasks.status} handleChange={handleStatus} />
          </Box>
          <Box
            sx={{
              marginBottom: "15px",
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <Box
              sx={{
                marginBottom: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="title">Starts</Typography>
              <DatePicker
                selected={tasks.start_date}
                onChange={handleStartDateChange}
                showTimeSelect
                dateFormat="MMM d, yyyy h:mm aa"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="title">Ends</Typography>
              <DatePicker
                selected={tasks.end_date}
                onChange={handleEndDateChange}
                showTimeSelect
                dateFormat="MMM d, yyyy h:mm aa"
              />
            </Box>
          </Box>
        </Grid>
      </Box>
      <Footer title="Add Task" handleClick={handleCreate} />
      {loading && <Loading />}
    </Box>
  );
};

export default CreateTasks;
