const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.get("/", (req, res) => {
  res.send("LM Payment Backend is LIVE 🚀");
});
// Login route
app.post("/auth/login", (req, res) => {
  const { email } = req.body;

  res.json({
    message: "Login success",
    user: {
      id: 1,
      email: email,
      name: "Laurie Muir"
    },
    token: "demo-token-123"
  });
});
app.get('/wallet', (req, res) => {
  res.json({
    balance: 12500,
    currency: "USD"
  });
});
app.post("/send", (req, res) => {
  const { to, amount } = req.body;

  res.json({
    success: true,
    message: "Transfer completed",
    to: to,
    amount: Number(amount),
    newBalance: 12500 - Number(amount)
  });
});
// Root route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
