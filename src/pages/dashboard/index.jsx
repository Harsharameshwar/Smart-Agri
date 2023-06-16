import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Clock from 'react-live-clock';
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const navigate=useNavigate();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [greeting, setGreeting]=useState("")
  const [time, setTime]=useState("")
  const colors = tokens(theme.palette.mode);

 

  useEffect(()=>{
    function Greeting(){
      const now = new Date();
      const currentHour = now.getHours();
  
      let greeting;
  
      if (currentHour >= 5 && currentHour < 12) {
          greeting = <div>Good morning ☀️</div>;
      } else if (currentHour >= 12 && currentHour < 18) {
          greeting = <div>Good afternoon 🌤️</div>;
      } else {
          greeting = <div>Good evening 🌙</div>;
      }
      setGreeting(greeting)
    }

    function getTime(){
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM'; // set AM or PM based on hours

      hours = hours % 12; // convert to 12-hour format
      hours = hours ? hours : 12; // set hour to 12 if 0

      // format minutes to have a leading zero if less than 10
      minutes = minutes < 10 ? '0' + minutes : minutes;

      var time = hours + ':' + minutes + ' ' + ampm; // combine hours, minutes, and AM/PM

      // console.log(time); // display the time in 12-hour format
      setTime(time)

    }
    getTime()
    Greeting()
  },[])


  return (
    <>
    <MyProSidebarProvider>
    <div style={{ height: "100%", width: "100%" }}>
      <main>
    <Topbar />
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
        >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Header title={greeting}  subtitle={<Clock format="h:mm:ss A" interval={1000} ticking={true} timezone="" />} />
       


      </Box> 

      {/* ///////////////////////////////////////// */}

      {/* GRID & CHARTS */}
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
        >
      {/* <Typography variant="h4" gutterBottom>
        Status Viewer
      </Typography> */}
      </Box> 
      {/* <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox 
              title="12,361"
              subtitle="Emails Sent"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
              />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
              />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
              />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
              />
          </Box>
        </Grid>
        </Grid> */}
      {/* ///////////////////////////////////////////////// */}


          
        <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="30px 0 10px 0"
        >
      <Typography variant="h4" gutterBottom>
        Sensors 
      </Typography>
      </Box> 
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/soilmoisturesensor`)}}>
          <Typography gutterBottom variant="h5" component="div">
            Soil Moisture Sensor
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/rainsensor`)}}>
          <Typography gutterBottom variant="h5" component="div">
           Rain Sensor
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/gridsensor`)}}>
          <Typography gutterBottom variant="h5" component="div">
             Grid Sensor
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        
        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/motorsensor`)}}>
          <Typography gutterBottom variant="h5" component="div">
            Motor Sensor
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid> */}
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/climatesensor`)}}>
          <Typography gutterBottom variant="h5" component="div">
            Climate Sensors
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        </Grid>

      {/*////////////////////////////////////////////// */}
      <Box 
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="30px 0 10px 0"
        >
      <Typography variant="h4" gutterBottom>
        Controls 
      </Typography>
      </Box> 
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/valvescontrol`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Valves Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/motormode`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Motor & Mode Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
              <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
          Add & Remove Valves
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Monitor soil moisture levels and its incoming data
          </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          </Box>
        </Grid> */}
        
        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
          width="100%"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          >
          <Card sx={{ maxWidth: 345 }} >
          <CardActionArea style={{backgroundColor:colors.primary[400]}}>
          
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Mode Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Monitor soil moisture levels and its incoming data
          </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          </Box>
        </Grid> */}
       
        </Grid>
      {/* ///////////////////////////////////////////// */}

      {/* //////////////////////////////////////////// */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="30px 0 10px 0"
        >
      <Typography variant="h4" gutterBottom>
      Reports & History
      </Typography>
      </Box> 
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent onClick={()=>{navigate(`/motorhistory`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Motor History
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/valvehistory`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Valve History
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/sensorreports`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Sensor Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/weatherhistory`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Weather History
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
       
        </Grid>

      {/* ///////////////////////////////////////////// */}


      {/* //////////////////////////////////////////// */}


      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="30px 0 10px 0"
        >
      <Typography variant="h4" gutterBottom>
      Analysis 
      </Typography>
      </Box> 
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/irrigationreport`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Irrigation Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/weatherreport`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Climate Predictions
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box className="animate__animated animate__fadeInLeft"
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
              <Card sx={{ maxWidth: 345 }} >
      <CardActionArea style={{backgroundColor:colors.primary[400]}}>
 
        <CardContent  onClick={()=>{navigate(`/waterusageanalysis`)}}>
          <Typography gutterBottom variant="h5" component="div">
          Water Usage Ananlysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Monitor soil moisture levels and its incoming data
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        </Grid>
       
        </Grid>
      {/* //////////////////////////////////////////// */}
        </Box>
        </main>
        </div>

    </MyProSidebarProvider>
              
            </>
  );
};

export default Dashboard;




