import { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../components/ResetPassword";
import UpdateProfile from "../components/UpdateProfile";
import SearchProductByPrice from "../components/ProductSearch";
export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Set the user states values with the user details upon successful login.
        if (typeof data._id !== "undefined") {
          setDetails(data);
        } else if (data.error === "User not found") {
          Swal.fire({
            title: "User not found",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        }
      });
  }, []);

  return (
    // (user.email === null) ?
    // <Navigate to="/courses" />
    // :
    user.id === null && localStorage.getItem("access") === null ? (
      <Navigate to="/products" />
    ) : (
      <>
        <Row>
          <Col className="p-5 bg-primary text-white">
            <h1 className="my-5 ">Profile</h1>
            {/* <h2 className="mt-3">James Dela Cruz</h2> */}
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contacts</h4>
            <ul>
              {/* <li>Email: {user.email}</li> */}
              <li>Email: {details.email}</li>
              {/* <li>Mobile No: 09266772411</li> */}
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <ResetPassword />
        </Row>
        <Row>
          <UpdateProfile userDetails={details} />
        </Row>
        <Row>
          <SearchProductByPrice />
        </Row>
      </>
    )
  );
}
