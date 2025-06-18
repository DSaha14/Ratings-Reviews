import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
//import './App.css';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "iPhone 15", description: "Latest Apple smartphone" },
      { id: 2, name: "Samsung Galaxy S24", description: "Flagship Android device" },
      { id: 3, name: "Sony WH-1000XM5", description: "Noise Cancelling Headphones" },
    ];
    setProducts(dummyProducts);
  }, []);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg,rgb(59, 119, 165) 0%,rgb(63, 122, 156) 100%)",
      }}
    >
      <div className="container">
      <h1 style={{ color: '#000000' }} className="text-center mb-5 fw-bold">
  🌟 Product Ratings & Reviews
</h1>
        <div className="row g-4 justify-content-center">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
