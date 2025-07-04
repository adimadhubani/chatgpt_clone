import React from "react";
import { 
  Box, 
  Typography, 
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  AccountTree,
  Terminal,
  Login,
  Logout,
  AccountCircle,
  Home,
  Code,
  Security
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled, keyframes } from "@mui/system";
import toast from "react-hot-toast";
import axios from "axios";

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

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
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
  padding: "6px 12px",
  margin: "0 8px",
  minWidth: "auto",
  "&:hover": {
    background: "rgba(0, 255, 170, 0.2)",
    boxShadow: "0 0 10px rgba(0, 255, 170, 0.5)"
  }
});

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("SESSION TERMINATED");
      handleMenuClose();
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("LOGOUT FAILED");
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: "rgba(5, 10, 15, 0.8)",
        borderBottom: "1px solid rgba(0, 255, 170, 0.3)",
        boxShadow: "0 0 10px rgba(0, 255, 170, 0.2)",
        backdropFilter: "blur(8px)"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TerminalText 
            variant="h5" 
            fontWeight="bold"
            sx={{ 
              cursor: "pointer",
              animation: `${glitch} 2s linear infinite`,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
            onClick={() => navigate("/")}
          >
            <Code fontSize="large" />
            AI_HACKER_TOOLS
          </TerminalText>
        </motion.div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {loggedIn ? (
            <>
              <CyberButton 
                onClick={() => navigate("/")}
                startIcon={<Home />}
              >
                HOME
              </CyberButton>
              
              <IconButton
                onClick={handleMenuOpen}
                size="medium"
                sx={{ 
                  border: "1px solid rgba(0, 255, 170, 0.3)",
                  ml: 1,
                  color: "#0fa",
                  "&:hover": {
                    background: "rgba(0, 255, 170, 0.2)"
                  }
                }}
              >
                <AccountCircle />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    background: "rgba(5, 10, 15, 0.9)",
                    border: "1px solid rgba(0, 255, 170, 0.3)",
                    color: "#0fa",
                    minWidth: "200px"
                  }
                }}
              >
                <MenuItem 
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                  }}
                  sx={{ fontFamily: '"Courier New", monospace' }}
                >
                  <AccountTree sx={{ mr: 1 }} /> USER_PROFILE
                </MenuItem>
                <Divider sx={{ borderColor: "rgba(0, 255, 170, 0.3)" }} />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ fontFamily: '"Courier New", monospace' }}
                >
                  <Logout sx={{ mr: 1 }} /> LOGOUT
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <CyberButton 
                onClick={() => navigate("/register")}
                startIcon={<Security />}
              >
                SIGN_UP
              </CyberButton>
              <CyberButton 
                onClick={() => navigate("/login")}
                startIcon={<Login />}
              >
                SIGN_IN
              </CyberButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;