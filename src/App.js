import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard";
// import Team from "./pages/team";
// import Invoices from "./pages/invoices";
// import Contacts from "./pages/contacts";
// import Form from "./pages/form";
// import Calendar from "./pages/calendar";
// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
import SoilMoisture from "./pages/SoilMoistureSensor/SoilMoisture";
import RainSensor from "./pages/RainSensor/RainSensor";
import GridSensor from "./pages/GridSensor/GridSensor";
import ClimateSensor from "./pages/ClimateSensor/ClimateSensor";
import MotorSensor from "./pages/MotorSensor/MotorSensor";
import MotorMode from "./pages/MotorMode/MotorMode";
import Valve from "./pages/Valve/Valve";
import LoginPage from "./pages/Login/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import { RequireAuth, useAuthUser } from "react-auth-kit";
import Account from "./pages/Account/Account";
import WeatherHistory from "./pages/WeatherHistory/WeatherHistory";
import MotorHistory from "./pages/MotorHistory/MotorHistory";
import ValveHistory from "./pages/ValveHistory/ValveHistory";
import WeatherReport from "./pages/ClimatePrediction/WeatherReport";
import SensorReports from "./pages/SensorReports/SensorReports";
import IrrigationReport from "./pages/IrrigationReport/IrrigationReport";
import WaterUsage from "./pages/WaterUsage/WaterUsage";
// import Dashboard from "./pages/dashboard";

const App = () => {
  const auth = useAuthUser();
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route
                element={
                  auth()?.data ? (
                    <Navigate to={`/dashboard`} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  auth()?.data ? <Navigate to={`/dashboard`} /> : <LoginPage />
                }
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/soilmoisturesensor"
                element={
                  <RequireAuth loginPath={"/"}>
                    <SoilMoisture />
                  </RequireAuth>
                }
              />
              <Route
                path="/motorsensor"
                element={
                  <RequireAuth loginPath={"/"}>
                    <MotorSensor />
                  </RequireAuth>
                }
              />
              <Route
                path="/valvescontrol"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Valve />
                  </RequireAuth>
                }
              />
              <Route
                path="/motormode"
                element={
                  <RequireAuth loginPath={"/"}>
                    <MotorMode />
                  </RequireAuth>
                }
              />
              <Route
                path="/rainsensor"
                element={
                  <RequireAuth loginPath={"/"}>
                    <RainSensor />
                  </RequireAuth>
                }
              />
              <Route
                path="/gridsensor"
                element={
                  <RequireAuth loginPath={"/"}>
                    <GridSensor />
                  </RequireAuth>
                }
              />
              <Route
                path="/climatesensor"
                element={
                  <RequireAuth loginPath={"/"}>
                    <ClimateSensor />
                  </RequireAuth>
                }
              />
                <Route
                path="/motorhistory"
                element={
                  <RequireAuth loginPath={"/"}>
                    <MotorHistory />
                  </RequireAuth>
                }
              />
               <Route
                path="/valvehistory"
                element={
                  <RequireAuth loginPath={"/"}>
                    <ValveHistory />
                  </RequireAuth>
                }
              />
              <Route
                path="/weatherhistory"
                element={
                  <RequireAuth loginPath={"/"}>
                    <WeatherHistory />
                  </RequireAuth>
                }
              />
                <Route
                path="/weatherreport"
                element={
                  <RequireAuth loginPath={"/"}>
                    <WeatherReport />
                  </RequireAuth>
                }
              />
                <Route
                path="/sensorreports"
                element={
                  <RequireAuth loginPath={"/"}>
                    <SensorReports />
                  </RequireAuth>
                }
              />
               <Route
                path="/irrigationreport"
                element={
                  <RequireAuth loginPath={"/"}>
                    <IrrigationReport />
                  </RequireAuth>
                }
              />
               <Route
                path="/waterusageanalysis"
                element={
                  <RequireAuth loginPath={"/"}>
                    <WaterUsage />
                  </RequireAuth>
                }
              />
              <Route
                path="/account"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Account />
                  </RequireAuth>
                }
              />
              {/* <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
        {/* </MyProSidebarProvider> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
