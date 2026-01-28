import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import { Topbar } from "../../layout/Topbar";
import api from "../../api/axios";
import { Button } from "@mui/material";

export default function District() {
  const [mpsList, setMpsList] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({}); // questionId -> File

  useEffect(() => {
    const loadData = async () => {
      try {
        const questionsRes = await api.get("/district/questions", {
          params: { type: "DISTRICT", year: 2026 },
        });
        setMpsList(questionsRes.data);

        const optionsRes = await api.get("/district/options");
        setOptions(optionsRes.data);
      } catch (error) {
        console.error("Failed to load district data", error);
      }
    };
    loadData();
  }, []);
  const validateBeforeSubmit = () => {
    for (const mps of mpsList) {
      for (const q of mps.questions) {
       
        if (!answers[q.id]) {
          alert("Please answer all questions");
          return false;
        }

        if (answers[q.id] === "FULL" && !files[q.id]) {
          alert("Please upload PDF for all 'Fully Met' answers");
          return false;
        }
      }
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) return;

    try {
      const formData = new FormData();
      const answerList = [];

      mpsList.forEach((mps) => {
        mps.questions.forEach((q) => {
          answerList.push({
            questionId: q.id,
            mpsId: mps.id,
            optionId: answers[q.id],
            year: 2026,
          });

          if (files[q.id]) {
            formData.append(`files_${q.id}`, files[q.id]);
          }
        });
      });

      formData.append(
        "answers",
        new Blob([JSON.stringify(answerList)], {
          type: "application/json",
        }),
      );

      await api.post("/district/submit-all", formData);

      alert("Assessment submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Submission failed");
    }
  };

  const glassPanelStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    p: 4,
    mb: 4,
    maxWidth: "1000px",
    mx: "auto",
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <Box sx={{ flex: 1 }}>
        {/* Fixed Topbar */}
        <Topbar />

        {/* Content (padding-top = Topbar height) */}
        <Container maxWidth="lg" sx={{ pt: "96px", pb: 6 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4, maxWidth: "1000px", mx: "auto" }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#fff" }}>
              District Assessment
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
              Fiscal Year 2026 Metrics
            </Typography>
          </Box>

          {/* MPS Cards */}
          {mpsList.map((mps, mpsIndex) => (
            <Paper key={mps.id} sx={glassPanelStyle} elevation={0}>
              {/* MPS Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  mb: 3,
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "rgba(255,255,255,0.2)", fontWeight: 800 }}
                >
                  {String(mpsIndex + 1).padStart(2, "0")}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ color: "#fff", textTransform: "uppercase" }}
                >
                  {mps.content}
                </Typography>
              </Box>

              {/* Questions */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {mps.questions.map((q, qIndex) => (
                  <Box
                    key={q.id}
                    sx={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      pb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          bgcolor: "rgba(255,255,255,0.1)",
                          px: 1,
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          height: "fit-content",
                          mt: 0.5,
                        }}
                      >
                        {mpsIndex + 1}.{qIndex + 1}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          lineHeight: 1.6,
                        }}
                      >
                        {q.question}
                      </Typography>
                    </Box>

                    <RadioGroup
                      row
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, [q.id]: e.target.value })
                      }
                      sx={{ gap: 4, ml: 5 }}
                    >
                      {options.map((opt) => (
                        <FormControlLabel
                          key={opt.optionId}
                          value={opt.optionId}
                          control={
                            <Radio
                              size="small"
                              sx={{
                                color: "rgba(255,255,255,0.3)",
                                "&.Mui-checked": { color: "#fff" },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "0.85rem",
                              }}
                            >
                              {opt.optionName}
                            </Typography>
                          }
                        />
                      ))}
                    </RadioGroup>
                    {/* Show file upload ONLY if Fully Met */}
                    {answers[q.id] === "FULL" && (
                      <Box sx={{ ml: 5, mt: 2 }}>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "0.8rem",
                            mb: 0.5,
                          }}
                        >
                          Upload supporting document (PDF only)
                        </Typography>

                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) =>
                            setFiles({
                              ...files,
                              [q.id]: e.target.files[0],
                            })
                          }
                          style={{
                            color: "white",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ px: 6, py: 1.5 }}
              onClick={handleSubmit}
            >
              Submit Assessment
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
