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

export default function Mpas() {
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
   
      row.content.toLowerCase().includes(search.toLowerCase()) 
     
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

  
  const handleView = (row) => {
    setSelectedRow(row);
    setOpenView(true);
  };

  const getMps = async () => {
    try {
      const res = await api.get("/admin/getMps");
      setRows(res.data); // 👈 store list
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
    getMps();
    
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />

        <Box sx={{ p: 4 }}>
          {/* ================= FORM ================= */}
          <Typography variant="h5" fontWeight={700} mb={1}>
           MPS
          </Typography>
         

        
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
              <Typography fontWeight={600}>MPS</Typography>

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
                  <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Content</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                  
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
                  .map((row,index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
        {page * rowsPerPage + index + 1}
      </TableCell>
                     
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
    