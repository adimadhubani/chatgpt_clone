const express = require("express");
const router = express.Router();
const {
  summaryController,
  paragraphController,
  chatbotController,
  jsconverterController,
} = require("../controllers/openiaController");

// Correct way to define routes
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);

module.exports = router;