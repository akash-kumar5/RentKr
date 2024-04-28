import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import CartPage from "../CartPage";
import axios from "axios";
import Cart from "../Cart";

const CheckoutPage = () => {
  const { user } = useAuth();
  const totalPrice = localStorage.getItem("totalPrice");
  const [activeSection, setActiveSection] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setDeliveryDetails({
      ...deliveryDetails,
      [name]: value,
    });
  };
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderError, setOrderError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update payment method when delivery method changes
    if (deliveryMethod === "cod") {
      setPaymentMethod("cod");
    }
  }, [deliveryMethod]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const fetchUserAddress = async (userId) => {
    try {
      const response = await fetch(`http:localhost:5000/api/users/${userId}/address`);
      if (!response.ok) {
        throw new Error("Failed to fetch user address.");
      }
      const addressData = await response.json();
      setDeliveryDetails(addressData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSectionHeader = (sectionNumber, title) => {
    return (
      <div className="mb-3">
        <h3>{title}</h3>
        <button
          className="btn btn-link nav-link text-warning"
          onClick={() => handleSectionChange(sectionNumber)}
        >
          {activeSection === sectionNumber ? "" : "Change"}
        </button>
      </div>
    );
  };

  const renderPaymentMethodForm = () => {
    if (deliveryMethod === "cod") {
      return (
        <div className="text-danger">
          Please have exact cash ready for payment upon delivery.
        </div>
      );
    } else {
      return (
        <form>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={() => handlePaymentMethodChange("creditCard")}
            />
            <label className="form-check-label" htmlFor="creditCard">
              Debit/Credit Card
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              id="upi"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => handlePaymentMethodChange("upi")}
            />
            <label className="form-check-label" htmlFor="upi">
              UPI
            </label>
          </div>
        </form>
      );
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Validate form fields
      if (!deliveryMethod || !paymentMethod) {
        throw new Error("Please select delivery method and payment method.");
      }
      const userId = user._id;
      const cartResponse = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    const products = cartResponse.data.items;
    console.log(products);
      const status = "pending";
      // Prepare order data
      const orderData = {
        userId,
        deliveryMethod,
        paymentMethod,
        deliveryDetails,
        products,
        totalPrice,
        status
        // Add other order details here (e.g., delivery address)
      };
      console.log(deliveryDetails);
      // Send POST request to server to create order
      const response = await fetch("http://localhost:5000/api/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      // Order created successfully, redirect or show success message
      alert("order placed")
      navigate("/success"); // Redirect to success page
    } catch (error) {
      // Handle order submission errors
      setOrderError(error.message);
    }
  };

  return (
    <div className="row bg-dark text-light pt-4">
      <div className="col-8 ps-5">
        <h1 className="text-warning text-center">Checkout </h1>

        {/* Delivery Details Section */}
        <div>
          {renderSectionHeader(1, "Delivery Details")}
          {activeSection === 1 && (
            <>
              <div>
                {/* Form for delivery details */}
                <form className="me-5 pe-5">
                  <label for="firstName">First name:</label>
                  <br />
                  <input className="form-control pe-5"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={deliveryDetails.firstName}
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label for="lastName">Last name:</label>
                  <br />
                  <input className="form-control"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={deliveryDetails.lastName}
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label for="phone">Phone:</label>
                  <br />
                  <input className="form-control"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={deliveryDetails.phone}
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label for="country">Country:</label>
                  <br />
                  <input className="form-control"
                    type="text"
                    id="country"
                    name="country"
                    value="India"
                  />
                  <br />
                  <label for="address">Address:</label>
                  <br />
                  <input className="form-control"
                    type="text"
                    id="address"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label for="city">City:</label>
                  <br />
                  <input className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryDetails.city}
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label for="state">State:</label>
                  <br />
                  <input className="form-control"
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryDetails.state}
                    onChange={handleInput}
                  />
                  <br />
                  <label for="postalCode">Zip/Postal code:</label>
                  <br />
                  <input className="form-control"
                    type="number"
                    id="postalCode"
                    name="postalCode"
                    value={deliveryDetails.postalCode}
                    onChange={handleInput}
                    required
                  />
                  <br />
                </form>
                {/* Button to save and continue to next section */}
              </div>
              <button
                className="btn btn-dark btn-outline-warning mb-4"
                onClick={() => handleSectionChange(2)}
              >
                Save and Continue
              </button>
            </>
          )}
        </div>

        {/* Delivery Method Section */}
        <div>
          {renderSectionHeader(2, "Delivery Method")}
          {activeSection === 2 && (
            <div>
              {/* Form for delivery method selection */}
              <form>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input "
                    type="radio"
                    id="prepaid"
                    name="deliveryMethod"
                    value="prepaid"
                    checked={deliveryMethod === "prepaid"}
                    onChange={() => handleDeliveryMethodChange("prepaid")}
                  />
                  <label className="form-check-label" htmlFor="prepaid">
                    Prepaid
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="cod"
                    name="deliveryMethod"
                    value="cod"
                    checked={deliveryMethod === "cod"}
                    onChange={() => handleDeliveryMethodChange("cod")}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </form>
              {/* Button to save and continue to next section */}
              <button
                className="btn btn-dark btn-outline-warning mb-3"
                onClick={() => handleSectionChange(3)}
                
              >
                Save and Continue
              </button>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div>
          {renderSectionHeader(3, "Payment")}
          {activeSection === 3 && (
            <div>
              {/* Form for payment information */}
              {renderPaymentMethodForm()}
              {/* Button to place the order */}
              <button className="btn btn-dark btn-outline-warning mb-3" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="col-4 m-0 ps-4 pt-4">
        <h1 className="text-warning text-center mb-0">Order Summary</h1>
        <Cart />
      </div>
    </div>
  );
};

export default CheckoutPage;
