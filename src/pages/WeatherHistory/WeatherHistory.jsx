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
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponentTemp />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
 
                  <GraphComponentHumi />
                </Box>
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
