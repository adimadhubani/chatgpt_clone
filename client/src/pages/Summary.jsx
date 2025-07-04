import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  IconButton,
  Divider,
  CircularProgress
} from "@mui/material";
import { 
  ArrowBack,
  Summarize,
  ContentCopy,
  Terminal,
  AutoFixHigh
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/system";

// Cyberpunk animations
const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0fa,
      0 0 80px #0fa,
      0 0 90px #0fa,
      0 0 100px #0fa,
      0 0 150px #0fa;
  }
  20%, 24%, 55% {        
    opacity: 0.8;
    text-shadow: none;
  }
`;

const scanline = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 10px;
  }
`;

const TerminalText = styled(Typography)({
  fontFamily: '"Courier New", monospace',
  color: "#0fa",
  textShadow: "0 0 5px rgba(0, 255, 170, 0.7)"
});

const CyberButton = styled(Button)({
  background: "rgba(0, 255, 170, 0.1)",
  border: "1px solid #0fa",
  color: "#0fa",
  fontFamily: '"Courier New", monospace',
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: "10px 20px",
  "&:hover": {
    background: "rgba(0, 255, 170, 0.2)",
    boxShadow: "0 0 10px rgba(0, 255, 170, 0.5)"
  }
});

const CyberTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: '"Courier New", monospace',
    color: "#0fa",
    "& fieldset": {
      borderColor: "rgba(0, 255, 170, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 255, 170, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0fa",
      boxShadow: "0 0 10px rgba(0, 255, 170, 0.5)"
    }
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 255, 170, 0.7)",
    fontFamily: '"Courier New", monospace',
  }
});

const SummaryCard = styled(Card)({
  background: "rgba(5, 10, 15, 0.8)",
  border: "1px solid rgba(0, 255, 170, 0.3)",
  borderRadius: "4px",
  color: "#0fa",
  fontFamily: '"Courier New", monospace',
  padding: "16px",
  position: "relative",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #0fa, transparent)",
    animation: `${flicker} 3s linear infinite`,
  }
});

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/summary", { text });
      setSummary(data);
      setError("");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  return (
    <Box
      width={isNotMobile ? "60%" : "90%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={1}
      sx={{ 
        background: "radial-gradient(circle at center, #051a15 0%, #020c0a 100%)",
        border: "1px solid rgba(0, 255, 170, 0.3)",
        boxShadow: "0 0 20px rgba(0, 255, 170, 0.2)",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            rgba(0, 255, 170, 0.05) 1px, 
            transparent 1px
          )`,
          backgroundSize: "100% 10px",
          animation: `${scanline} 1s linear infinite`,
          pointerEvents: "none",
          zIndex: 0
        }
      }}
    >
      <Box position="relative" zIndex={1}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate("/")} sx={{ color: "#0fa", mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <TerminalText variant="h3" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Summarize sx={{ mr: 1, fontSize: "2rem" }} />
            TEXT_COMPRESSION_MODULE
          </TerminalText>
        </Box>

        <Collapse in={error}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              background: "rgba(120, 0, 0, 0.3)",
              color: "#ff5555",
              border: "1px solid #ff5555",
              fontFamily: '"Courier New", monospace'
            }}
          >
            {"SYSTEM_ERROR: " + error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <CyberTextField
            placeholder="> ENTER_TEXT_FOR_COMPRESSION..."
            type="text"
            multiline
            rows={6}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputProps={{
              style: { fontSize: "0.9rem" }
            }}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <CyberButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<AutoFixHigh />}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ color: "#0fa", mr: 1 }} />
                  COMPRESSING
                </>
              ) : (
                "GENERATE_SUMMARY"
              )}
            </CyberButton>
          </Box>
        </form>

        <TerminalText variant="body2" mt={2} sx={{ display: "flex", alignItems: "center" }}>
          <Terminal sx={{ mr: 1 }} />
          SYSTEM: AWAITING_INPUT
        </TerminalText>

        <Divider sx={{ my: 3, borderColor: "rgba(0, 255, 170, 0.3)" }} />

        <SummaryCard
          sx={{
            height: isNotMobile ? "400px" : "300px",
            mb: 2
          }}
        >
          {summary ? (
            <>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={copyToClipboard} size="small" sx={{ color: "#0fa" }}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
              <TerminalText variant="body1">
                {"> " + summary}
              </TerminalText>
            </>
          ) : (
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Summarize sx={{ fontSize: "4rem", color: "rgba(0, 255, 170, 0.3)", mb: 2 }} />
              <TerminalText variant="h6" color="rgba(0, 255, 170, 0.5)">
                 COMPRESSED_OUTPUT_WILL_APPEAR_HERE
              </TerminalText>
            </Box>
          )}
        </SummaryCard>

        <TerminalText variant="caption" sx={{ opacity: 0.7 }}>
          SYSTEM_STATUS: {summary ? "COMPRESSION_COMPLETE" : "AWAITING_INPUT"} | 
          LAST_UPDATE: {new Date().toLocaleTimeString()}
        </TerminalText>
      </Box>
    </Box>
  );
};

export default Summary;