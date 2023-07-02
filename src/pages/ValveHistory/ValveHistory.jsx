import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import  PieChart  from "../../components/PieChart";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import axios from "axios";
import Plot from "react-plotly.js";
import GraphComponent from "./GraphComponent";
// import GraphComponent from "./GraphComponentHumi";
// import GraphComponentTemp from "./GraphComponentTemp";

export default function ValveHistory() {
  const theme = useTheme();
  const path = process.env.REACT_APP_PATH;
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const graphData=[{
  graphData:{
    x: [1, 2, 3, 4, 5],
    y: [20, 22, 24, 25, 26],
  }}]

  const plotLayout = {
    autosize: true,
    plot_bgcolor: "#3f4494",
    paper_bgcolor: "#141b2d",
    font: { color: "white" },
    xaxis: {
      title: {
        text: "Date-Time",
        font: { color: "white" },
      },
    },
    yaxis: {
      title: {
        text: "Valve History",
        font: { color: "white" },
      },
    },
    responsive: true, // Added the responsive property
  };

//   const plotData = graphDatagraphData;
//   console.log(plotData)
  const columns = [
    { field: "id", headerName: "Id", width: 20 },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "left",
      type: "number",
      width: 75,
      cellClassName: "name-column--cell",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      type: "number",
      width: 200,
      cellClassName: "name-column--cell",
      align: "left",
    },
    {
      field: "Date",
      headerName: "Date",
      type: "Date",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Time",
      headerName: "Time",
      type: "Time",
      headerAlign: "left",
      align: "left",
    },
  ];

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${path}gethistorybtype/1/valve`);
    //   console.log(res.data)
      let itemobj = [];
      var j = 0;
      res?.data?.forEach((i) => {
        j++;
        itemobj.push({
          slno: j + "",
          id: j + "",
          action: i.action + "",
          description: i.description + "",
          Date: "10-03-2023",
          Time: "5:30am",
        });
      });
      setData(itemobj);
    }
    fetch();
  },[data]);

  //   console.log(data)
  const mockDataTeam = [
    {
      id: 1,
      Temp: 28,
      Humi: 25,
      Date: "3-03-2023",
      Time: "3.00pm",
    },
    {
      id: 2,
      Temp: 24,
      Humi: 25,
      Date: "10-03-2023",
      Time: "5:30am",
    },
    {
      id: 3,
      Temp: 26,
      Humi: 24,
      Date: "11-03-2023",
      Time: "10.00am",
    },
    {
      id: 4,
      Temp: 27,
      Humi: 26,
      Date: "21-03-2023",
      Time: "12.00pm",
    },
    {
      id: 5,
      Temp: 24,
      Humi: 25,
      Date: "22-03-2023",
      Time: "4.00pm",
    },
    {
      id: 6,
      Temp: 28,
      Humi: 25,
      Date: "23-03-2023",
      Time: "7.00am",
    },
    {
      id: 7,
      Temp: 28,
      Humi: 25,
      Date: "24-03-2023",
      Time: "6.00pm",
    },
    {
      id: 8,
      Temp: 28,
      Humi: 25,
      Date: "25-03-2023",
      Time: "12.00am",
    },
    {
      id: 9,
      Temp: 28,
      Humi: 25,
      Date: "26-03-2023",
      Time: "1.00pm",
    },
  ];
  return (
    <>
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Box m="20px 20px 0px 20px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header
                  title="Valve History"
                  subtitle="Tracks the control history of valves"
                  style={{ height: "20px" }}
                />
              </Box>
              <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                <GraphComponent />
              </Box>

              <Box
                m="8px 0 0 0"
                maxWidth="75vh"
                height="70vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ margin: "2% 0 0 0" }}
                >
                  Valve History Table
                </Typography>
                <DataGrid
                  rows={data}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
            </Box>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
