

// //fecthing api
import React, { useState, useEffect } from "react";

function Store() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products with images
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // setLoading(false);
      })
      // .catch((error) => {
      //   console.error("Error fetching products:", error);
      //   setLoading(false);
      // });
  }, []); // runs once when component mounts

  // if (loading) {
  //   return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  // }

  return (
    <div style={{ padding: "10px" }}>
     
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button  style={{ backgroundColor: "orange",
    color: "white",
    padding: "10px 10px",
    border: "none",
    borderRadius: "5px",}}>Shop Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
