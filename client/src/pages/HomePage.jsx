import React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  Stack, 
  Grid,
  useTheme,
  useMediaQuery,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  DescriptionRounded,
  FormatAlignLeftOutlined,
  ChatRounded,
  CodeRounded,
  ImageRounded,
  TerminalRounded,
  SecurityRounded,
  DataObjectRounded
} from "@mui/icons-material";
import { motion } from "framer-motion";
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

const HackerCard = styled(Card)(({ theme }) => ({
  borderRadius: "4px",
  height: "260px",
  width: "100%",
  maxWidth: "280px",
  transition: "all 0.3s ease",
  background: "rgba(10, 15, 20, 0.8)",
  border: "1px solid rgba(0, 255, 170, 0.3)",
  boxShadow: "0 0 10px rgba(0, 255, 170, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, transparent, #0fa, transparent)",
    animation: `${flicker} 3s linear infinite`,
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 0 20px rgba(0, 255, 170, 0.5)",
    border: "1px solid rgba(0, 255, 170, 0.7)",
    cursor: "pointer",
    "&:after": {
      opacity: 1,
    }
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      0deg,
      transparent 0%,
      rgba(0, 255, 170, 0.1) 30%,
      transparent 70%,
      transparent 100%
    )`,
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  }
}));

const HackerIcon = styled(Box)(({ theme }) => ({
  width: "70px",
  height: "70px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  background: "rgba(0, 255, 170, 0.1)",
  border: "1px solid rgba(0, 255, 170, 0.3)",
  color: "#0fa",
  fontSize: "36px",
  "& svg": {
    filter: "drop-shadow(0 0 5px rgba(0, 255, 170, 0.7))"
  }
}));

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

const features = [
  {
    title: "TEXT SUMMARY",
    description: "SUMMARIZE LONG TEXT INTO SHORT SENTENCES",
    icon: <DescriptionRounded />,
    path: "/summary"
  },
  {
    title: "PARAGRAPH GEN",
    description: "GENERATE PARAGRAPH WITH WORDS",
    icon: <FormatAlignLeftOutlined />,
    path: "/paragraph"
  },
  {
    title: "AI CHATBOT",
    description: "CHAT WITH AI CHATBOT",
    icon: <ChatRounded />,
    path: "/chatbot"
  },
  {
    title: "JS CONVERTER",
    description: "TRANSLATE ENGLISH TO JS CODE",
    icon: <CodeRounded />,
    path: "/js-converter"
  },
  {
    title: "SCIFI IMAGE",
    description: "GENERATE SCIFI IMAGES",
    icon: <ImageRounded />,
    path: "/scifi-image"
  },
  {
    title: "CODE TERMINAL",
    description: "EXECUTE CODE IN BROWSER",
    icon: <TerminalRounded />,
    path: "/terminal"
  },
  {
    title: "ENCRYPTION",
    description: "ENCRYPT/DECRYPT MESSAGES",
    icon: <SecurityRounded />,
    path: "/encryption"
  },
  {
    title: "JSON TOOL",
    description: "VALIDATE & FORMAT JSON",
    icon: <DataObjectRounded />,
    path: "/json-tool"
  }
];

const Homepage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 4,
      minHeight: "100vh",
      background: "radial-gradient(circle at center, #051a15 0%, #020c0a 100%)",
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
    }}>
      {/* Matrix rain effect would go here - would need a separate component */}
      
      <Box position="relative" zIndex={1}>
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 4,
            mt: 4,
            fontFamily: '"Courier New", monospace',
            textTransform: "uppercase",
            letterSpacing: "4px",
            animation: `${glitch} 2s linear infinite`,
            color: "#0fa",
            textShadow: "0 0 10px rgba(0, 255, 170, 0.7)"
          }}
        >
          AI_HACKER_TOOLS
        </Typography>
        
        <TerminalText variant="body1" textAlign="center" mb={4}>
           SYSTEM INITIALIZED. SELECT A TOOL TO BEGIN. ACCESS GRANTED.
        </TerminalText>
        
        <Grid container spacing={3} justifyContent="center" sx={{ px: isMobile ? 1 : 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HackerCard onClick={() => navigate(feature.path)}>
                  <HackerIcon>
                    {feature.icon}
                  </HackerIcon>
                  <Stack spacing={1} textAlign="center">
                    <TerminalText variant="h6" fontWeight="bold">
                      {feature.title}
                    </TerminalText>
                    <TerminalText variant="caption">
                      {feature.description}
                    </TerminalText>
                  </Stack>
                </HackerCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" mt={4}>
          <CyberButton 
            onClick={() => navigate("/admin")}
            startIcon={<SecurityRounded />}
          >
            ADMIN_ACCESS
          </CyberButton>
        </Box>
        
        <TerminalText variant="body2" textAlign="center" mt={4}>
           SYSTEM STATUS: ONLINE. LAST UPDATE: {new Date().toLocaleString()}
        </TerminalText>
      </Box>
    </Box>
  );
};

export default Homepage;
