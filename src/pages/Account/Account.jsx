import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";

// Import the SVG icon
import { ReactComponent as UndrawIcon } from "../../assets/account.svg";
import { useAuthUser } from "react-auth-kit";

const Account = () => {
  // ...existing code
  const auth= useAuthUser();
  // const user=auth()?.data[0]?.ue;
  // console.log(user)
  // const [name, setName] = useState(user?.name || "");
  // const [email, setEmail] = useState(user?.email || "");
  // const [phone, setPhone] = useState(user?.phone ||"");
  const [name, setName] = useState("Harsha");
  const [email, setEmail] = useState("harsha@gmail.com");
  const [phone, setPhone] = useState("984570261");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("Bengaluru");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your account settings update logic here
  };

  return (
    <>
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <Topbar />
          <Box m="20px" display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  Account Settings
                </Typography>
                {/* Add the SVG icon */}
                <Box display="flex" justifyContent="center" mb={2}>
                  <UndrawIcon width={200} height={200} />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                  Account Settings
                </Typography>
                <form onSubmit={handleSubmit}>
                  {" "}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        startAdornment={
                          <InputAdornment position="start">
                            <HiOutlineMail />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        startAdornment={
                          <InputAdornment position="start">
                            <HiOutlineMail />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        required
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        startAdornment={
                          <InputAdornment position="start">
                            <HiOutlineLockClosed />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <HiOutlineEyeOff />
                              ) : (
                                <HiOutlineEye />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        required
                        startAdornment={
                          <InputAdornment position="start">
                            <HiOutlineLockClosed />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          value={location}
                          onChange={handleLocationChange}
                          displayEmpty
                          required
                          renderValue={(value) =>
                            value ? <em>{value}</em> : "Location"
                          }
                        >
                          <MenuItem value="" disabled>
                            Location
                          </MenuItem>
                          <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                          <MenuItem value="mysuru">Mysuru</MenuItem>
                          <MenuItem value="Chikamagalur">Chikamagalur</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </div>
      </MyProSidebarProvider>
    </>
  );
};

export default Account;
