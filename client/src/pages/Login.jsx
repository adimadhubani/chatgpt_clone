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
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress
} from "@mui/material";
import { 
  ArrowBack,
  Login as LoginIcon,
  HowToReg,
  Visibility,
  VisibilityOff,
  Lock,
  Email
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
  padding: "12px 24px",
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
    "&.Mui-focused": {
      color: "#0fa"
    }
  }
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
      toast.success("ACCESS GRANTED");
      localStorage.setItem("authToken", true);
      navigate("/");
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

  return (
    <Box
      width={isNotMobile ? "40%" : "90%"}
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
            <Lock sx={{ mr: 1, fontSize: "2rem" }} />
            SECURE_LOGIN
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
            {"SECURITY ALERT: " + error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <CyberTextField
            label="> ENTER_CREDENTIALS"
            type="email"
            required
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "rgba(0, 255, 170, 0.7)" }} />
                </InputAdornment>
              ),
              style: { fontSize: "0.9rem" }
            }}
          />

          <CyberTextField
            label="> ENTER_PASSPHRASE"
            type={showPassword ? "text" : "password"}
            required
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "rgba(0, 255, 170, 0.7)" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "rgba(0, 255, 170, 0.7)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { fontSize: "0.9rem" }
            }}
          />

          <Box display="flex" justifyContent="center" mt={3}>
            <CyberButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<LoginIcon />}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ color: "#0fa", mr: 1 }} />
                  AUTHENTICATING
                </>
              ) : (
                "REQUEST_ACCESS"
              )}
            </CyberButton>
          </Box>
        </form>

        <Divider sx={{ my: 3, borderColor: "rgba(0, 255, 170, 0.3)" }} />

        <Box textAlign="center">
          <TerminalText variant="body2">
            UNAUTHORIZED_USER? <Link 
              to="/register" 
              style={{ 
                color: "#0fa", 
                textDecoration: "none",
                fontFamily: '"Courier New", monospace',
                marginLeft: "4px"
              }}
            >
              <HowToReg sx={{ verticalAlign: "middle", fontSize: "1rem", mr: 0.5 }} />
              REQUEST_CLEARANCE
            </Link>
          </TerminalText>
        </Box>

        <TerminalText variant="caption" sx={{ display: "block", textAlign: "center", mt: 3, opacity: 0.7 }}>
          SYSTEM_STATUS: SECURE | LAST_ACCESS_ATTEMPT: {new Date().toLocaleTimeString()}
        </TerminalText>
      </Box>
    </Box>
  );
};

export default Login;