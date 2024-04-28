import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useHistory, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/order/view/${userId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();

    // Start the countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          // Navigate to home page when countdown reaches 1
          clearInterval(timer);
          navigate("/");
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Clear the timer when component unmounts
    return () => clearInterval(timer);
  }, [userId]);

  return (
    <div className="container-os">
      <div className="printer-top"></div>

      <div className="paper-container">
        <div className="printer-bottom"></div>

        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Order Complete</div>
            <div className="success-description">
              Thank you for completing the payment! You will shortly receive an
              email of your payment.
            </div>
            <div className="order-details">
              <div className="complement">Thank You!</div>
            </div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>

      <div className="countdown-text text-warning">
        You are being redirected to the homepage in {countdown}...
      </div>
    </div>
  );
};

export default OrderSuccess;
