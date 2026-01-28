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

const SIDEBAR_WIDTH = 280;

export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const username = user?.userName || "User";

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/"); // optional: redirect after logout
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e2e8f0",

        /* 🔥 CRITICAL FIX */
        left: `${SIDEBAR_WIDTH}px`,
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,

        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          justifyContent: "flex-end",
          px: 3,
        }}
      >
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
              fontWeight: 600,
            }}
          >
            {username[0]?.toUpperCase()}
          </Avatar>

          <Typography
            fontWeight={600}
            sx={{ color: "#475569" }}
          >
            {username}
          </Typography>
        </Box>

        {/* DROPDOWN MENU */}
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
              boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
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
