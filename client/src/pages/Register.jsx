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
  HowToReg,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Security
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/system";

// Cyberpunk animations
const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
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
  margin: "8px 0",
  "&:hover": {
    background: "rgba(0, 255, 170, 0.3)",
    boxShadow: "0 0 15px rgba(0, 255, 170, 0.7)"
  },
  "&.Mui-disabled": {
    borderColor: "rgba(0, 255, 170, 0.1)",
    color: "rgba(0, 255, 170, 0.3)"
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
      borderColor: "rgba(0, 255, 170, 0.7)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0fa",
      boxShadow: "0 0 10px rgba(0, 255, 170, 0.7)"
    }
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 255, 170, 0.7)",
    fontFamily: '"Courier New", monospace',
    "&.Mui-focused": {
      color: "#0fa",
      textShadow: "0 0 5px rgba(0, 255, 170, 0.7)"
    }
  }
});

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", { 
        username, 
        email, 
        password 
      });
      toast.success("IDENTITY CREATED", {
        style: {
          background: "rgba(5, 10, 15, 0.9)",
          border: "1px solid #0fa",
          color: "#0fa",
          fontFamily: '"Courier New", monospace'
        }
      });
      navigate("/login");
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
        background: "rgba(5, 10, 15, 0.95)",
        border: "1px solid rgba(0, 255, 170, 0.5)",
        boxShadow: "0 0 25px rgba(0, 255, 170, 0.3)",
        position: "relative",
        overflow: "hidden",
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
          <IconButton 
            onClick={() => navigate("/")} 
            sx={{ 
              color: "#0fa",
              "&:hover": {
                background: "rgba(0, 255, 170, 0.2)"
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <TerminalText 
            variant="h3" 
            sx={{ 
              flexGrow: 1, 
              display: "flex", 
              alignItems: "center",
              animation: `${flicker} 2s linear infinite`
            }}
          >
            <Security sx={{ mr: 1, fontSize: "2rem" }} />
            IDENTITY_CREATION_PORTAL
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
              fontFamily: '"Courier New", monospace',
              "& .MuiAlert-icon": {
                color: "#ff5555"
              }
            }}
          >
            {"SECURITY ALERT: " + error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <CyberTextField
            label="> ENTER_HANDLE"
            required
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "rgba(0, 255, 170, 0.7)" }} />
                </InputAdornment>
              ),
              style: { fontSize: "0.9rem" }
            }}
            sx={{ mb: 2 }}
          />

          <CyberTextField
            label="> ENTER_COM_LINK"
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
            sx={{ mb: 2 }}
          />

          <CyberTextField
            label="> ENCRYPTION_KEY"
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
            sx={{ mb: 3 }}
          />

          <CyberButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            endIcon={isLoading ? <CircularProgress size={24} sx={{ color: "#0fa" }} /> : <HowToReg />}
            disabled={isLoading}
          >
            {isLoading ? "INITIALIZING..." : "CREATE_IDENTITY"}
          </CyberButton>
        </form>

        <Divider sx={{ 
          my: 3, 
          borderColor: "rgba(0, 255, 170, 0.3)",
          "&:before, &:after": {
            borderColor: "rgba(0, 255, 170, 0.3)"
          }
        }}>
          <TerminalText variant="body2">OR</TerminalText>
        </Divider>

        <Box textAlign="center">
          <TerminalText variant="body2">
            EXISTING_IDENTITY?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: "#0fa",
                textDecoration: "none",
                fontFamily: '"Courier New", monospace',
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              <LoginIcon sx={{ mr: 0.5 }} />
              INITIATE_LOGIN_SEQUENCE
            </Link>
          </TerminalText>
        </Box>

        <TerminalText 
          variant="caption" 
          sx={{ 
            display: "block", 
            textAlign: "center", 
            mt: 3, 
            color: "rgba(0, 255, 170, 0.5)",
            fontStyle: "italic"
          }}
        >
          SYSTEM_STATUS: SECURE | LAST_ACCESS: {new Date().toLocaleTimeString()}
        </TerminalText>
      </Box>
    </Box>
  );
};

export default Register;