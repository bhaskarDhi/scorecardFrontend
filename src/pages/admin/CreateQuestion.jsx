import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Select,
  FormHelperText,
  Grid,
  Chip,
  alpha,
  FormControl,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./../../api/axios";
import { Sidebar } from "./../../layout/Sidebar";
import { Topbar } from "./../../layout/Topbar";

export default function CreateQuestion() {
  const [departments, setDepartments] = useState([]);
  const [mpsList, setMpsList] = useState([]);
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [year, setYear] = useState("");
  const [mpsId, setMpsId] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };
  const formTypes = [
    { value: "DEPARTMENT", label: "Department" },
    { value: "DISTRICT", label: "District" },
  ];

  // ================= API CALLS =================

  const getAllDepartment = async () => {
    try {
      const res = await api.get("/admin/departments");
      setDepartments(res.data);
    } catch (error) {
      showSnack("Failed to get departments", "error");
    }
  };

  const getMps = async () => {
    try {
      const res = await api.get("/admin/getMps");
      setMpsList(res.data);
    } catch (error) {
      showSnack("Failed to get MPS", "error");
    }
  };

  useEffect(() => {
    getAllDepartment();
    getMps();
  }, []);

  // ================= HANDLERS =================

  const handleSubmit = async () => {
    if(type.length>0 && question.length>0  && year.length>0 ){
    try {
      await api.post("admin/create_question", {
        type,
        question,
        departmentId,
        year,
        mpsId,
      });

      showSnack("Question created successfully", "success");
    } catch (error) {
      showSnack("Failed to create question", "error");
    }
}else{
     showSnack("Enter valid details", "error");
}
  };

  const handleCancel = () => {
    setForm({
      question: "",
      year: "",
      type: "",
      departmentId: "",
      mpsId: "",
    });
  };

  // ================= UI =================

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Topbar />

        <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{
                mb: 1,
                color: "#6366f1",
              }}
            >
              Create New Question
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Define questions for department or district performance scorecards
            </Typography>
          </Box>

          {/* Main Form Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
            }}
          >
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Enter Question"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="outlined-basic"
                  label="Year"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setYear(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Select Form Type</InputLabel>

                  <Select
                    labelId="type-label"
                    id="formType"
                    name="formType"
                    value={formTypes.type}
                    label="Select Form Type"
                    onChange={(e) => setType(e.target.value)}
                  >
                    {formTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {type === "DEPARTMENT" && (
                <Grid size={8}>
                  <FormControl fullWidth>
                    <InputLabel id="department-label">
                      Select Department
                    </InputLabel>

                    <Select
                      labelId="department-label"
                      id="department"
                      name="departmentId"
                      value={departments.departmentId}
                      label="Select Department"
                      onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      {departments.map((dept) => (
                        <MenuItem
                          key={dept.departmentId}
                          value={dept.departmentId}
                        >
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid size={4}>
                {type === "DISTRICT" && (
                  <FormControl fullWidth>
                    <InputLabel id="msp-label">Select MSP</InputLabel>

                    <Select
                      labelId="msp-label"
                      id="msp"
                      name="mspId"
                      value={mpsList.id}
                      label="Select MSP"
                      onChange={(e) => setMpsId(e.target.value)}
                    >
                      {mpsList.map((mps) => (
                        <MenuItem key={mps.id} value={mps.id}>
                          {mps.content}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid size={12}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      bgcolor: "#6366f1",
                      "&:hover": { bgcolor: "#4f46e5" },
                    }}
                  >
                    Submit Question
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
        </Box>
      </Box>
    </Box>
  );
}
