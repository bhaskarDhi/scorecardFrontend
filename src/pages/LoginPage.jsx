import React from "react";
import {
  Button,
  Box,
  TextField,
  Avatar,
  Stack,
  Typography,
  InputAdornment,
  Link,
  Divider,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  PersonOutline,
  LockOutline,
  Login,
  AdminPanelSettings,
  Security,
} from "@mui/icons-material";
import api from "../api/axios";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: { main: "#5d327c" }, // Deep Purple from image
    secondary: { main: "#ffb300" },
  },
  typography: {
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
  },
});

export default function LoginPage() {
  //login

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLoginSubmit = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    try {
      const res = await api.post("auth/login", { username, password });
    
      const {role,token,userName} = res.data;

      login({ token, role,userName });

      if (role == "ROLE_ADMIN") navigate("/admin");
      else if (role === "ROLE_DISTRICT") navigate("/district/questions/view");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  //end
  return (
    <ThemeProvider theme={theme}>
      {/* Main Wrapper */}
      <Grid container sx={{ minHeight: "100vh", bgcolor: "#FFFFFF" }}>
        {/* LEFT SIDE: Branding */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Centers content vertically
            padding: { xs: "40px", md: "80px" },
            bgcolor: "#F8FAFC", // Light contrast background
          }}
        >
          {/* Logos Fixed at Top */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ position: "absolute", top: 40, left: 80 }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "#fff",
                border: "1px solid #E2E8F0",
                color: "#64748B",
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              GOVT OF
              <br />
              ASSAM
            </Avatar>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "#fff",
                border: "1px solid #E2E8F0",
                color: "#64748B",
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              ASDMA
              <br />
              LOGO
            </Avatar>
          </Stack>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1.5,
                mb: 1,
              }}
            >
              ASSAM STATE DISASTER MANAGEMENT AUTHORITY
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, color: "#1E293B", lineHeight: 1.1, mb: 2 }}
            >
              Flood Preparedness
              <br />
              <span style={{ color: "#5d327c" }}>Scorecard 2025</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#64748B",
                maxWidth: "480px",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              A centralized digital ecosystem for real-time monitoring and
              reporting of flood readiness across all districts.
            </Typography>

            {/* Analysis Illustration Container */}
            <Box
              component="img"
              src="https://img.freepik.com/free-vector/analysis-concept-illustration_114360-1119.jpg"
              sx={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "20px",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))",
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE: Login Form */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            borderLeft: "1px solid #F1F5F9",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#1E293B" }}
              >
                Login
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: "#64748B", mb: 4 }}>
              Enter your operator credentials to access the reporting dashboard.
            </Typography>

            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "#64748B", ml: 0.5 }}
                >
                  Username
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter username"
                  onChange={(u) => setUsername(u.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline
                          sx={{ color: "primary.main", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mt: 0.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "#64748B", ml: 0.5 }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  onChange={(p) => setPassword(p.target.value)}
                  placeholder="••••••••"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutline
                          sx={{ color: "primary.main", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mt: 0.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                    },
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => handleLoginSubmit()}
                endIcon={<Login />}
                sx={{
                  py: 1.8,
                  borderRadius: "12px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 16px rgba(93, 50, 124, 0.25)",
                  textTransform: "none",
                }}
              >
                LOGIN
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
