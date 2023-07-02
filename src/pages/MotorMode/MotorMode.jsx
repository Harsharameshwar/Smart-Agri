import { Box, Stack, Switch, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import LineChart from '../../components/LineChart';
// import { useStopwatch } from "react-use-stopwatch";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import axios from "axios";
import GraphComponent from "./GraphComponent";
// import { tokens } from '../../theme';

export default function MotorMode() {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const path= process.env.REACT_APP_PATH;
  // const [{ format }, start, stop, reset] = useStopwatch();
  const [motor, setMotor] = useState(false);
  const [mode, setMode] = useState(false);
  const [valve,setValve]=useState(false)
  // console.log(checked,checked1);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${path}senddata/1`);
      // console.log(res.data)

      res.data && (res.data.ve[0].status==="off"  ) && setValve(true)

      res.data && res.data.devicemode === "manual" && setMode(true);
      res.data && res.data.motorstatus === "on" && setMotor(true);
    }

    fetch();
  });
  return (
    <>
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Box m="20px">
              <Header
                title="Motor & Mode Control"
                subtitle="Motor control and Mode Control"
              />
              <Box>
                <Typography variant="h4" align="center">
                  {/* {format} */}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  p: 1,
                  m: 1,
                }}
              >
                {/* <Typography>Motor Control</Typography> */}
                <Box>
                  <Typography align="center">Motor Control</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Off</Typography>
                    <Switch
                      id="motor-button"
                      {...label}
                      checked={motor}
                      onChange={async (event) => {
                        try {
                          const res = await axios.get(
                            `${path}motoronoff/1`
                          );
                          console.log(res.status);
                          setMotor((prevstate) => !prevstate);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      // onChange={(event) => setMotor(event.target.checked)}
                      color="secondary"
                    />
                    <Typography>On</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography align="center">Mode Control</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Auto</Typography>
                    <Switch
                      id="mode-button"
                      {...label}
                      checked={mode}
                      onChange={async (event) => {
                        try {
                          if(mode===true && valve){
                            console.log("came here")
                            try{
                              const res = await axios.get(
                                `${path}onoffvalve/1/1`
                              );
                              console.log(res.status)
                            }
                            catch(err){
                              console.log(err)
                            }
                          }
                          const res = await axios.get(
                            `${path}switchmode/1`
                          );
                          console.log(res.status);
                          setMode((prevstate) => !prevstate);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      // onChange={(event) => setMode(event.target.checked)}
                      color="secondary"
                    />
                    <Typography>Manual</Typography>
                  </Stack>
                </Box>
              </Box>

              <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                <Typography variant="h4" gutterBottom>
                  Mode & Mode Analysis
                </Typography>
                <GraphComponent/>
              </Box>


            </Box>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
