import { Box } from "@mui/material";
import Header from "../../components/Header";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";

import GraphComponentTemp from "./GraphComponentTemp";
import GraphComponentHumi from "./GraphComponentHumi";
import WeatherPage from "./WeatherCard";

export default function WeatherHistory() {
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
                    title="Weather History"
                    subtitle="Weather Analysis for past days"
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
                  <GraphComponentTemp />
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
                  <GraphComponentHumi />
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
