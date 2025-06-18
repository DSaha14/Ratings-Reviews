const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Srk13abd", // your password
  database: "ratings_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Table creation (optional)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ratings_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT,
    review TEXT,
    UNIQUE KEY unique_user_product (user_id, product_id)
  )
`;
db.query(createTableQuery, (err) => {
  if (err) console.error("Table creation error:", err);
});

// Submit rating/review
app.post("/api/rate-review", (req, res) => {
  const { user_id, product_id, rating, review } = req.body;

  if (!rating && !review) {
    return res.status(400).json({ message: "Provide at least a rating or a review." });
  }

  const query = `
    INSERT INTO ratings_reviews (user_id, product_id, rating, review)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [user_id, product_id, rating, review], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "You already rated this product." });
      }
      console.error(err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(200).json({ message: "Review submitted successfully!" });
  });
});

// Get average rating and reviews
app.get("/api/product/:id/reviews", (req, res) => {
  const productId = req.params.id;

  const query = `
    SELECT rating, review FROM ratings_reviews WHERE product_id = ?
  `;

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error." });
    }

    const ratings = results.filter(r => r.rating !== null).map(r => r.rating);
    const averageRating = ratings.length
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : null;

    const reviews = results
      .filter(r => r.review && r.review.trim().length > 0)
      .map(r => r.review);

    res.status(200).json({ averageRating, reviews });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
