import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Input,
} from "@mui/material";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  const path = process.env.REACT_APP_PATH;
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    var res;
    e.preventDefault();
    try {
      res = await axios.post(`https://mydesk.tk:5000/api/auth/login`, {
        email: name,
        password: passwd,
      });
      signIn({
        token: res.data?.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { data: res.data?.user },
      });
      console.log(res);
      navigate(`/dashboard`);
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoad(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            p: 4,
            borderRadius: 4,
            backgroundColor: `${colors.grey[600]}`,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Login
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Input
                  placeholder="Email"
                  id="email-input"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  fullWidth
                  required={true}
                  startAdornment={
                    <InputAdornment position="start">
                      <HiOutlineMail />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  placeholder="Password"
                  id="password-input"
                  required={true}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <HiOutlineLockClosed />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              {err && (
                <Typography
                  variant="body1"
                  component="p"
                  align="center"
                  fontWeight="bold"
                  color="red"
                  fontSize="16px"
                  fontStyle="italic"
                >
                  User Name and Password do not match.
                </Typography>
              )}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    // isloading={load}
                    id="login-button"
                    style={{
                      backgroundColor: `${colors.blueAccent[800]}`,
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
