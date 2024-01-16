import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const CheckoutButton = ({ cartItems, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);

    fetch("http://localhost:4000/orders/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === true) {
          Swal.fire({
            icon: "success",
            title: "Checkout Successful!",
            text: "Your order has been created successfully.",
          });
          fetchData(); // Fetch updated product data after successful checkout
        } else {
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: "Failed to create the order. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: "An error occurred during checkout. Please try again.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button variant="success" onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </Button>
  );
};

export default CheckoutButton;
