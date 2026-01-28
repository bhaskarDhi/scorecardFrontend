import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  IconButton,
} from "@mui/material";
import { Sidebar } from "./../../layout/Sidebar";
import { Topbar } from "./../../layout/Topbar";
export default function District() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />
      </Box>
    </Box>
  );
}
