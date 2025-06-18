import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function ProductCard({ product }) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const fetchProductData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${product.id}/reviews`);
      const data = await res.json();
      setAverageRating(data.averageRating);
      setReviews(data.reviews);
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSubmit = async () => {
    if (!rating && !review.trim()) {
      alert("Please provide at least a rating or a review.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/rate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          product_id: product.id,
          rating,
          review,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setRating(0);
        setReview("");
        fetchProductData();
      } else {
        alert(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div
      className="card h-100 border-0 rounded-4 p-3 shadow"
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(6px)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.05)";
      }}
    >
      <div className="card-body d-flex flex-column">
        <h4 className="card-title fw-semibold mb-1 text-dark">{product.name}</h4>
        <p className="text-secondary mb-2" style={{ fontSize: "0.95rem" }}>
          {product.description}
        </p>

        {averageRating && (
          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < Math.round(averageRating) ? "#ffc107" : "#dee2e6"}
              />
            ))}
            <small className="ms-2 text-muted">({averageRating} avg)</small>
          </div>
        )}

        <div className="mb-3">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={26}
                className="me-1"
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#dee2e6"}
                style={{ cursor: "pointer", transition: "color 0.2s" }}
              />
            );
          })}
        </div>

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Drop a review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <button
          className="btn btn-outline-primary w-100 fw-semibold"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {message && (
          <div className="alert alert-success mt-3 py-2 text-center small" role="alert">
            {message}
          </div>
        )}

        <button
          className="btn btn-sm btn-link mt-2 text-primary fw-medium text-decoration-none"
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>

        {showReviews && (
          <div className="mt-3 border-top pt-3">
            <h6 className="fw-bold">User Reviews:</h6>
            {reviews.length === 0 ? (
              <p className="text-muted small">No reviews yet.</p>
            ) : (
              <ul className="list-unstyled">
                {reviews.map((r, idx) => (
                  <li key={idx} className="text-muted small border-bottom py-1">
                    "{r}"
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
