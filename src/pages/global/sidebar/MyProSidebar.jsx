// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useEffect, useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { GiGroundSprout, GiValve } from "react-icons/gi";
import { BsCloudRainFill } from "react-icons/bs";
import { FcElectricalSensor } from "react-icons/fc";
import { SiCodeclimate, SiValve } from "react-icons/si";
import { TbCircuitMotor } from "react-icons/tb";
import { MdAutoMode } from "react-icons/md";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const location = useLocation();

  useEffect(() => {
    function select() {
      if (location?.pathname === "/dashboard") {
        setSelected("Dashboard");
      } else if (location?.pathname === "/soilmoisturesensor") {
        setSelected("Soil Moisture Sensor");
      } else if (location?.pathname === "/rainsensor") {
        setSelected("Rain Sensor");
      } else if (location?.pathname === "/gridsensor") {
        setSelected("Grid Sensor");
      } else if (location?.pathname === "/motorsensor") {
        setSelected("Motor Sensor");
      } else if (location?.pathname === "/climatesensor") {
        setSelected("Climate Sensors");
      } else if (location?.pathname === "/valvescontrol") {
        setSelected("Valves Control");
      } else if (location?.pathname === "/motormode") {
        setSelected("Motor & Mode Control");
      } else if (location?.pathname === "/motorhistory") {
        setSelected("Motor History");
      } else if (location?.pathname === "/valvehistory") {
        setSelected("Valve History");
      } else if (location?.pathname === "/sensorreports") {
        setSelected("Sensor Reports");
      } else if (location?.pathname === "/weatherhistory") {
        setSelected("Weather History");
      } else if (location?.pathname === "/irrigationreports") {
        setSelected("Irrigation Reports");
      } else if (location?.pathname === "/weatherreport") {
        setSelected("Climate Predictions");
      } else if (location?.pathname === "/waterusageanalysis") {
        setSelected("Water Usage Analysis");
      }
      // else if (location?.pathname === "/weatherhistory") {
      //   setSelected("Weather History");
      // }
    }
    select();
  }, []);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <img src="../../assets/seeding.png" alt="icon"/> */}
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  onClick={() => navigate("/dashboard")}
                >
                  SMART-AGRI
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Sensors
            </Typography>
            <Item
              title="Soil Moisture Sensor"
              to="/soilmoisturesensor"
              icon={<GiGroundSprout style={{ fontSize: "20px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Rain Sensor"
              to="/rainsensor"
              icon={<BsCloudRainFill style={{ fontSize: "20px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Grid Sensor"
              to="/gridsensor"
              icon={<FcElectricalSensor style={{ fontSize: "23px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Motor Sensor"
              to="/motorsensor"
              icon={<TbCircuitMotor style={{ fontSize: "25px" }} />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Climate Sensors"
              to="/climatesensor"
              icon={<SiCodeclimate style={{ fontSize: "25px" }} />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Controls
            </Typography>
            <Item
              title="Valves Control"
              to="/valvescontrol"
              icon={<GiValve style={{ fontSize: "23px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Motor & Mode Control"
              to="/motormode"
              icon={<TbCircuitMotor style={{ fontSize: "23px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Add & Remove Valves"
              to="/valve"
              icon={<SiValve  style={{fontSize:"23px"}} />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Mode Control"
              to="/faq"
              icon={<MdAutoMode  style={{fontSize:"21px"}} />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Reports & History
            </Typography>
            <Item
              title="Motor History"
              to="/motorhistory"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Valve History"
              to="/valvehistory"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sensor Reports"
              to="/sensorreports"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Weather History"
              to="/weatherhistory"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Predictions
            </Typography>
            {/* <Item
              title="NPK Predictions "
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Irrgation Report"
              to="/irrigationreport"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Climate Predictions"
              to="/weatherreport"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Water Usage Analysis"
              to="/waterusageanalysis"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
