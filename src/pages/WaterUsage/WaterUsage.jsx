import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";

// import WeatherPage from "./WeatherCard";
import GraphComponentBorewell from "./GraphComponentBorewell";
import GraphComponentSoil from "./GraphComponentSoil";
import WaterCard from "./WaterCard";

export default function WaterUsage() {
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
                    title="Water Usage"
                    subtitle="Water Usage Analysis"
                    style={{ height: "20px" }}
                  />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <Typography variant="h4" gutterBottom>
                    Water Usage Analysis Of Borewell
                  </Typography>
                  <GraphComponentBorewell />
                </Box>
                <Box m="20px" height="75vh" p="2px"  style={{marginBottom:"10%", overflowX: "scroll"}}>
                  <Typography variant="h4" gutterBottom>
                    Water Usage Analysis Of Soil Moisture
                  </Typography>
                  <GraphComponentSoil />
                </Box>

                <Box m="0 0 0 10%" maxWidth="75vh" height="70vh">
                  <WaterCard />
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
