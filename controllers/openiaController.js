// const dotenv = require("dotenv");
// dotenv.config();
// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Summary Controller
// exports.summaryController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       prompt: `Summarize this \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
    
//     if (response.choices[0].text) {
//       return res.status(200).json(response.choices[0].text);
//     }
    
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };

// // Paragraph Controller
// exports.paragraphController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       prompt: `write a detail paragraph about \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
    
//     if (response.choices[0].text) {
//       return res.status(200).json(response.choices[0].text);
//     }
    
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };

// // Chatbot Controller
// // Updated chatbotController with better error handling
// exports.chatbotController = async (req, res) => {
//     try {
//       const { text } = req.body;
      
//       // Validate input
//       if (!text || typeof text !== 'string') {
//         return res.status(400).json({ message: 'Invalid input' });
//       }
  
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo", // Using the more affordable model
//         messages: [
//           {
//             role: "system",
//             content: "You are Yoda from Star Wars. Answer questions in Yoda's style."
//           },
//           {
//             role: "user",
//             content: text
//           }
//         ],
//         max_tokens: 300,
//         temperature: 0.7,
//       });
      
//       if (response.choices[0].message?.content) {
//         return res.status(200).json(response.choices[0].message.content);
//       }
      
//       return res.status(500).json({ message: 'No response from AI' });
      
//     } catch (err) {
//       console.error('OpenAI Error:', err);
      
//       // Specific error handling
//       if (err.status === 429) {
//         return res.status(429).json({
//           message: 'API rate limit exceeded. Please try again later or check your OpenAI quota.'
//         });
//       }
      
//       if (err.code === 'insufficient_quota') {
//         return res.status(402).json({
//           message: 'API quota exceeded. Please check your OpenAI billing settings.'
//         });
//       }
      
//       return res.status(500).json({
//         message: err.message || 'Error processing your request'
//       });
//     }
//   };

// // JS Converter Controller
// exports.jsconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       prompt: `/* convert these instruction into javascript code \n${text}`,
//       max_tokens: 400,
//       temperature: 0.25,
//     });
    
//     if (response.choices[0].text) {
//       return res.status(200).json(response.choices[0].text);
//     }
    
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };

// // Sci-fi Image Controller
// exports.scifiImageController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const response = await openai.images.generate({
//       prompt: `generate a scifi image of ${text}`,
//       n: 1,
//       size: "512x512",
//     });
    
//     if (response.data[0].url) {
//       return res.status(200).json(response.data[0].url);
//     }
    
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };





const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1"; // Verify the correct API URL

// Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Summarize this: ${text}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices?.[0]?.message?.content) {
      return res.status(200).json(response.data.choices[0].message.content);
    } else {
      throw new Error("No response from DeepSeek");
    }
  } catch (err) {
    console.error("DeepSeek API Error:", err.response?.data || err.message);
    return res.status(500).json({
      message: err.response?.data?.error?.message || "Failed to summarize text",
    });
  }
};

// Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Write a detailed paragraph about: ${text}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices?.[0]?.message?.content) {
      return res.status(200).json(response.data.choices[0].message.content);
    } else {
      throw new Error("No response from DeepSeek");
    }
  } catch (err) {
    console.error("DeepSeek API Error:", err.response?.data || err.message);
    return res.status(500).json({
      message: err.response?.data?.error?.message || "Failed to generate paragraph",
    });
  }
};

// Chatbot Controller
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Invalid input" });
    }

    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are Yoda from Star Wars. Answer questions in Yoda's style.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices?.[0]?.message?.content) {
      return res.status(200).json(response.data.choices[0].message.content);
    } else {
      throw new Error("No response from DeepSeek");
    }
  } catch (err) {
    console.error("DeepSeek API Error:", err.response?.data || err.message);

    if (err.response?.status === 429) {
      return res.status(429).json({
        message: "API rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      message: err.response?.data?.error?.message || "Error processing your request",
    });
  }
};

// JS Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Convert these instructions into JavaScript code: ${text}`,
          },
        ],
        max_tokens: 400,
        temperature: 0.25,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices?.[0]?.message?.content) {
      return res.status(200).json(response.data.choices[0].message.content);
    } else {
      throw new Error("No response from DeepSeek");
    }
  } catch (err) {
    console.error("DeepSeek API Error:", err.response?.data || err.message);
    return res.status(500).json({
      message: err.response?.data?.error?.message || "Failed to convert to JavaScript",
    });
  }
};