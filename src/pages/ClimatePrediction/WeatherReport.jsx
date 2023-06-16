import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import  PieChart  from "../../components/PieChart";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import GraphComponentWeather from "./GraphComponentWeather";
import axios from "axios";
import WeatherPage from "./WeatherCard";
import GraphCard from "./GraphCard";

export default function WeatherReport() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);




  return (
    <>
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Box m="20px">
              <Box m="20px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Header
                    title="Weather Report"
                    subtitle="Final Report of Weather"
                    style={{ height: "20px" }}
                  />
                </Box>
                <Box
                  m="20px"
                  height="75vh"
                  p="2px"
                //   style={{ marginBottom: "10%" }}
                >
                  {/* <Typography variant="h4" gutterBottom >
        Temprature Data Graph
      </Typography> */}
                  <GraphComponentWeather />
                </Box>
                <Box
                  m="20px"
                  height="75vh"
                  p="2px"
                //   style={{ marginBottom: "10%" }}
                >
                  {/* <Typography variant="h4" gutterBottom >
        Temprature Data Graph
      </Typography> */}
                  <GraphCard />
                </Box>
                {/* <Box
                  style={{
                    marginBottom: "10%",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                >
                    <GraphCard/>
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={`data:image/png;base64,${seabornGraph}`}
                    alt="Seaborn Graph"
                  />
                </Box> */}
                <Box m="0 0 0 10%" maxWidth="75vh" height="70vh">
                  <WeatherPage />
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
