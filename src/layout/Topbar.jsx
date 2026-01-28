import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
    const{logout,user}=useAuth();
  const username = user.userName;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {/* USER DROPDOWN TRIGGER */}
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            px: 2,
            py: 0.8,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#f1f5f9",
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#6366f1",
              fontSize: "0.875rem",
            }}
          >
            {username[0]}
          </Avatar>

          <Typography
            fontWeight={600}
            sx={{ color: "#475569" }}
          >
            {username}
          </Typography>
        </Box>

        {/* DROPDOWN */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 140,
              borderRadius: 2,
              boxShadow:
                "0px 8px 24px rgba(0,0,0,0.12)",
            },
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              fontWeight: 500,
              py: 1.2,
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
