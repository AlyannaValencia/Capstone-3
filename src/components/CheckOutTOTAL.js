// CheckoutButton.js
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const CheckoutButton = ({ cartItems }) => {
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Calculate total quantity and total amount whenever cart items change
    if (cartItems && cartItems.length > 0) {
      const newTotalQuantity = cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + (Number(currentItem.quantity) || 0),
        0
      );

      const newTotal = cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.subtotal * currentItem.quantity,
        0
      );

      setTotal(newTotal);
      setTotalQuantity(newTotalQuantity);
    } else {
      // If cartItems is undefined or empty, reset totals
      setTotal(0);
      setTotalQuantity(0);
    }
  }, [cartItems]);

  const handleCheckout = () => {
    // Checkout logic
    const subtotalDetails = cartItems.map((item) => {
      console.log("item", item);

      // Check if item has productId and price properties
      if (item.productId && item.productId.price) {
        const itemQuantity = Number(item.quantity) || 0;
        const itemPrice = Number(item.productId.price) || 0;
        const subtotal = itemQuantity * itemPrice;

        return {
          product: item.productId.name,
          subtotal: subtotal.toFixed(2),
        };
      } else {
        console.log("Invalid item:", item);
        return {
          product: "Unknown Product",
          subtotal: "0.00",
        };
      }
    });

    console.log("subtotalDetails", subtotalDetails);

    Swal.fire({
      icon: "success",
      title: "Checkout Successful!",
      html:
        `<p>Total Quantity: ${totalQuantity}</p>` +
        `<p>Total Amount: $${total.toFixed(2)}</p>`,
    });

    // Clear the cart after a successful checkout
  };
  return (
    <Button variant="success" onClick={handleCheckout}>
      Checkout
    </Button>
  );
};

export default CheckoutButton;