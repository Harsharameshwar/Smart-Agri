import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import  LineChart  from "../../components/LineChart";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";

export default function MotorSensor(){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" ,width:70},
    {
    field: "onoff",
     headerName: "On/Off ",
    //  headerAlign: "left",
    //  align: "left",
    headerAlign: "center",
    align: "center",
      width: 100,
      cellClassName: "name-column--cell",
    },
    {
        field: "mode",
        headerName: "Mode",
        headerAlign: "center",
      align: "center",
        type: "number",
        width: 100,
      // width: 75,
        cellClassName: "name-column--cell",
        // align: "left",
      },
    {
      field: "Date",
      headerName: "Date",
      type:"Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      // align: "left",
      // headerAlign: "left",
    },
    {
        field: "Time",
        headerName: "Time",
        type:"Time",
        width: 150,
          headerAlign: "center",
      align: "center",
        // headerAlign: "left",
        // align: "left",
      }];

    const mockDataTeam=[  {
        id: 1,
        mode: "auto",
        onoff: "on",
        Date: "3-03-2023",
        Time: "3.00pm",
      },
      {
        id: 2,
        mode: "manual",
        onoff: "off",
        Date: "10-03-2023",
        Time: "5:30am",
      },
      {
        id: 3,
        mode: "auto",
        onoff: "on",
        Date: "11-03-2023",
        Time: "10.00am",
      },
      {
        id: 4,
        mode: "manual",
        onoff: "off",
        Date: "21-03-2023",
        Time: "12.00pm",
      },
      {
        id: 5,
        mode: "auto",
        onoff: "on",
        Date: "22-03-2023",
        Time: "4.00pm",
      },
      {
        id: 6,
        mode: "manual",
        onoff: "off",
        Date: "23-03-2023",
        Time: "7.00am",
      },
      {
        id: 7,
        mode: "auto",
        onoff: "on",
        Date: "24-03-2023",
        Time: "6.00pm",
      },
      {
        id: 8,
        mode: "manual",
        onoff: "off",
        Date: "25-03-2023",
        Time: "12.00am",
      },
      {
        id: 9,
        mode: "auto",
        onoff: "on",
        Date: "26-03-2023",
        Time: "1.00pm",
      }]
    // { field: "phone", headerName: "Phone Number", width: 100 },
    // { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "access",
    //   headerName: "Access Llvel",
    //   width: 100,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="100%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : colors.greenAccent[800]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  return (
    <>
    <MyProSidebarProvider>
    <div style={{ height: "100%", width: "100%" }}>
      <main>
    <Topbar />
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Motor Sensor" subtitle="Tracks the status of motor" style={{height:"20px"}} />
      </Box>
      <Box m="20px" height="75vh" p="2px" style={{marginBottom:"10%"}}>
      <Typography variant="h4" gutterBottom >
        Sensor Data Graph
      </Typography>
      {/* <LineChart /> */}
    </Box>
      <Box
        m="8px 0 0 0"
        maxWidth="100vh"
        justifyContent="center"
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
        <Typography variant="h4" gutterBottom style={{margin:"10% 0 5% 0"}}>
        Sensor Data Table
      </Typography>
        <DataGrid
          rows={mockDataTeam}
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
