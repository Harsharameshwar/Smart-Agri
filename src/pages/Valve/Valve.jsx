import { Box, Stack, Switch, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import LineChart from '../../components/LineChart';
// import { useStopwatch } from "react-use-stopwatch";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
// import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import GraphComponent from "./GraphComponent";
// import { tokens } from '../../theme';

export default function Valve() {
  // const [{ format }, start, stop, reset] = useStopwatch();
  const [valve1, setValve1] = useState(false);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [valve,setValve]=useState(false)

  const path=process.env.REACT_APP_PATH;
  const [valve2, setValve2] = useState(false);

  // const auth = useAuthUser();

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${path}getvalves/1`);
      const res1 = await axios.get(`${path}senddata/1`);
      // console.log(res1.data)
      res.data &&
        setName(
          res.data[0]?.name.charAt(0).toUpperCase() + res.data[0]?.name.slice(1)
        );
      res.data &&
        setName1(
          res.data[1]?.name.charAt(0).toUpperCase() + res.data[1]?.name.slice(1)
        );
      // console.log(name)
      res.data && res.data[0].status === "on" && setValve1(true);
      res.data && res.data[1].status === "on" && setValve2(true);
      res1.data && res1.data.devicemode === "auto" && setValve(true)
    }

    fetch();
  });

  // console.log(checked,checked1);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Box m="20px">
              <Header
                title="Valves Control"
                subtitle="Solenoid Valves Control"
              />
              <Box>
                {/* <Typography variant='h4' align='center'>
            {format}
        </Typography> */}
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
                  <Typography align="center">{name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Off</Typography>
                    <Switch
                      {...label}
                      checked={valve1}
                      id="first-valve-button"
                      disabled={valve}
                      onChange={async (event) => {
                        try {
                          const res = await axios.get(
                            `${path}onoffvalve/1/1`
                          );
                          console.log(res.status);
                          setValve1((prevstate) => !prevstate);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      color="secondary"
                    />
                    <Typography>On</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography align="center">{name1}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Off</Typography>
                    <Switch
                      {...label}
                      id="second-valve-button"
                      checked={valve2}
                      onChange={async (event) => {
                        try {
                          const res = await axios.get(
                            `${path}onoffvalve/1/2`
                          );
                          console.log(res.status);
                          setValve2((prevstate) => !prevstate);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      color="secondary"
                    />
                    <Typography>On</Typography>
                  </Stack>
                </Box>
              </Box>

              <Box
                m="20px"
                height="75vh"
                maxWidth="150vh"
                p="2px"
                style={{ marginBottom: "10%" }}
              >
                <Typography variant="h4" gutterBottom>
                  Valves Duration
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
