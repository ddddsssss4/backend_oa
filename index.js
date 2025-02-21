import express, { json } from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(json());
app.use(cors(
    {
        origin: ['https://oaasas.vercel.app'],
        credentials: true
    }
));

// Constants
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Utility functions
const isAlphabet = (char) => /^[A-Za-z]$/.test(char);
const isNumber = (char) => /^\d+$/.test(char);

const findHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return [];
  const highest = alphabets.reduce((max, curr) => 
    curr.toLowerCase() > max.toLowerCase() ? curr : max
  );
  return [highest];
};

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Input validation
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: data must be an array"
      });
    }

    // Process the data
    const numbers = data.filter(item => isNumber(item));
    const alphabets = data.filter(item => isAlphabet(item));
    const highest_alphabet = findHighestAlphabet(alphabets);

    // Send response
    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// GET endpoint
app.get('/bfhl', (_, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});