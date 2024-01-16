import React, { useState, useEffect } from "react";
import { Container, Row, Col, hr } from "react-bootstrap";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedProduct from "../components/FeaturedProduct";
import RandomGadgetCarousel from "../components/Caurosel";
import Video from "../components/Video";
import OffersCards from "../components/FooterImages";
// import ProductCatalog from "../components/ProductsCatalog";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = {
    title: "GadgetCo.",
    content: "Bringing Innovation to Your Fingertips",
    destination: "/products",
    label: "Buy Now!",
  };

  useEffect(() => {
    // Fetch products from your database/API
    fetch("http://localhost:4000/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched products in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even on error
      });
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <Container>
      <Banner data={data} />
      <RandomGadgetCarousel />
      <hr style={{ marginBottom: "2rem" }} />
      <FeaturedProduct />
      <Video />
      <hr style={{ marginBottom: "2rem", color: "white" }} />
      <h2 className="mb-4">
        The GadgetCo experience. Do even more with GadgetCo products and
        services.
      </h2>
      <hr style={{ width: "100%" }} />
      <Row className="mb-4">
        <Col xs={12} lg={12}>
          <OffersCards />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Highlights />
        </Col>
      </Row>
      {/* {loading ? <p>Loading...</p> : <ProductCatalog products={products} />} */}
    </Container>
  );
}
