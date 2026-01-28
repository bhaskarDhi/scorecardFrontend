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
import api from "../../api/axios";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Sidebar } from "../../layout/Sidebar";
import { Topbar } from "../../layout/Topbar";
import { TablePagination } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function DepartmentGuidelines() {
  const [year, setYear] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const filteredRows = rows.filter(
    (row) =>
      row.year.toString().includes(search) ||
      row.content.toLowerCase().includes(search.toLowerCase()) ||
      row.departmentName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async () => {
    if (year.length === 4 && content.length > 10 && departmentId) {
      try {
        await api.post("/admin/create_dep_guide", {
          year,
          content,
          departmentId,
        });

        showSnack("Department guideline saved successfully ✔", "success");

        setYear("");
        setContent("");
        setDepartmentId("");
        fetchGuidelines();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            showSnack("Guideline for this year already exists", "warning");
          } else {
            showSnack("Something went wrong. Try again.", "error");
          }
        } else {
          showSnack("Server not reachable", "error");
        }
      }
    } else {
      showSnack("Enter valid year and content", "info");
    }
  };

  const fetchGuidelines = async () => {
    setLoading(true);
    try {
      const res = await api.get("admin/dept/guidelines");
      setRows(res.data); // expects List<ViewAllDistrictGuideline>
    } catch (error) {
      showSnack("Failed to load guidelines", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleView = (row) => {
    setSelectedRow(row);
    setOpenView(true);
  };

  const getAllDepartment = async () => {
    try {
      const res = await api.get("/admin/departments");
      setDepartments(res.data); // 👈 store list
    } catch (error) {
      showSnack("Failed to get departments", "error");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  useEffect(() => {
    fetchGuidelines();
    getAllDepartment();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />

        <Box sx={{ p: 4 }}>
          {/* ================= FORM ================= */}
          <Typography variant="h5" fontWeight={700} mb={1}>
            Department Guidelines
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Add new department-level form guidelines
          </Typography>

          <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2}>
              Add Guideline
            </Typography>

            <Box sx={{ display: "grid", gap: 3, maxWidth: 700 }}>
              <TextField
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
              ></TextField>

              <TextField
                select
                label="Department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                fullWidth
              >
                {departments.map((dep) => (
                  <MenuItem key={dep.id} value={dep.departmentId}>
                    {dep.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Guideline Content"
                multiline
                minRows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
              />

              <Box>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6366f1" }}
                  onClick={handleSubmit}
                >
                  Save Guideline
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* ================= TABLE ================= */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography fontWeight={600}>Previous Year Guidelines</Typography>

              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  width: 260,
                  bgcolor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <IconButton size="small">
                  <Search size={18} />
                </IconButton>
                <InputBase
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ fontSize: "0.9rem" }}
                />
              </Paper>
            </Box>

            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Content</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.departmentName}</TableCell>
                      <TableCell>
                        {row.content.length > 60
                          ? row.content.slice(0, 60) + "..."
                          : row.content}
                      </TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleView(row)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                {filteredRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredRows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                borderTop: "1px solid #e2e8f0",
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>District Guideline ({selectedRow?.year})</DialogTitle>
        <DialogContent dividers>
          <Typography>{selectedRow?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
    