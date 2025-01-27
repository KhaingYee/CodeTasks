import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu, Settings, ElectricBolt } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";

import { logout } from "../features/auth/authSlice";
import ApiCollections from "../services/ApiCollections";
import { ApiRequest } from "../services/ApiRequest";
import Loading from "../components/Loading";
import { BASE_URL } from "../api/domain";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getTaskList();
    fetchData();
  }, []);

  // const getTaskList = async () => {
  //   setLoading(true);
  //   const obj = {
  //     method: "get",
  //     url: `${BASE_URL}${ApiCollections.task_list}`,
  //     params: {
  //       page: page,
  //     },
  //   };
  //   console.log("url", obj);
  //   try {
  //     let response = await ApiRequest(obj);
  //     setLoading(false);
  //     if (response.flag !== false) {
  //       setPageCount(response.last_page);
  //       setList([...list, ...response.data.items]);
  //       console.log("task lists", response);
  //     } else {
  //       toast.error(response.message, {
  //         position: "top-right",
  //         duration: 3000,
  //       });
  //       console.log("error", response);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(error.message, {
  //       position: "top-right",
  //       duration: 3000,
  //     });
  //   }
  // };

  // const fetchData = () => {
  //   setPage(page + 1);
  //   getTaskList();
  // };

  const handleSettingsClick = () => {
    navigate("/account");
  };
  const handleClickMenu = () => {
    navigate("/");
  };

  const handleClick = () => {
    navigate("/tasks/create");
  };

  // Fake API Data
  const mockTasks = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Task Title ${i + 1}`,
    description: `This is the description for task ${i + 1}`,
  }));

  const fetchFakeTasks = (page, perPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        resolve({
          data: mockTasks.slice(start, end),
          last_page: Math.ceil(mockTasks.length / perPage),
        });
      }, 1000);
    });
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchFakeTasks(page, 10);
      setList((prevList) => [...prevList, ...response.data]);
      setPageCount(response.last_page);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
      }}>
      <Header
        leftIcon={<Menu />}
        title="Dashboard"
        RightIcon={<Settings />}
        handleClickleft={handleClickMenu}
        handleClickRight={handleSettingsClick}
      />
      <Box
        id="scrollable-container"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundColor: "#f9f9f9",
          paddingBottom: "70px",
        }}>
        <Box>
          {list.length > 0 &&
            list.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderLeft: "5px solid #0A56BB",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "16px",
                  mt: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <ElectricBolt />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="title">{item.title}</Typography>
                  <Typography variant="subtitle">{item.description}</Typography>
                </Box>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#0A56BB",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1877f2",
                    },
                  }}>
                  Processing
                </Button>
              </Box>
            ))}
        </Box>
        {list.length > 0 && (
          <InfiniteScroll
            dataLength={list.length}
            next={fetchData}
            hasMore={true}
            loader={
              pageCount >= page ? (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Typography>No more tasks</Typography>
                </Box>
              )
            }
            scrollableTarget="scrollable-container"></InfiniteScroll>
        )}
        {loading && <Loading />}
      </Box>
      <Footer title="New Task" handleClick={handleClick} />
    </Box>
  );
};

export default Dashboard;
