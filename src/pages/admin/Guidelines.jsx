import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
} from "@mui/material";

import { Sidebar } from "../../layout/Sidebar";
import { Topbar } from "../../layout/Topbar";

export default function Guidelines() {

  const rows = [
    { type: "District", id: 263, year: 2025, dept: "-", district: "-" },
    { type: "Department", id: 262, year: 2025, dept: "Water Resources", district: "-" },
    { type: "District", id: 261, year: 2025, dept: "-", district: "Kamrup" },
    { type: "Department", id: 260, year: 2024, dept: "Health Services", district: "-" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />

        <Box sx={{ p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Form Guidelines
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and configure form guidelines for different departments and districts
            </Typography>
          </Box>

          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Form Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>District</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Chip
                        label={row.type}
                        size="small"
                        sx={{
                          bgcolor: row.type === "District" ? "#ede9fe" : "#dbeafe",
                          color: row.type === "District" ? "#7c3aed" : "#2563eb",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>#{row.id}</TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.dept}</TableCell>
                    <TableCell>{row.district}</TableCell>

                    <TableCell>
                      <Chip label="Edit" size="small" clickable sx={{ mr: 1 }} />
                      <Chip label="View" size="small" clickable />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
