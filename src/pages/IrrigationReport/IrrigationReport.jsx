import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import GraphComponent1 from "./GraphComponent1";
import GraphComponent2 from "./GraphComponent2";
import GraphComponent3 from "./GraphComponent3";
import GraphComponent4 from "./GraphComponent4";
import GraphComponent5 from "./GraphComponent5";

// import GraphComponentTemp from "./GraphComponentTemp";
// import GraphComponentHumi from "./GraphComponentHumi";
// import WeatherPage from "./WeatherCard";

export default function IrrigationReport() {
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
                    title="Irrigation Report"
                    subtitle="Irrigattion report using sensors data"
                    style={{ height: "20px" }}
                  />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponent1 />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponent2 />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponent3 />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponent4 />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <GraphComponent5 />
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
