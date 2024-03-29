import React, { useState } from "react";
import DelDetail from "./DelDetail";

const CheckoutPage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const renderSectionHeader = (sectionNumber, title) => {
    return (
      <div className="mb-3">
        <h3>{title}</h3>
        <button
          className="btn btn-link nav-link"
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

  return (
    <div>
      <h2>Checkout</h2>

      {/* Delivery Details Section */}
      <div>
        {renderSectionHeader(1, "Delivery Details")}
        {activeSection === 1 && (
          <>
            <DelDetail />
            <button
              className="btn btn-primary"
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
                  className="form-check-input"
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
              className="btn btn-primary"
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
            <button className="btn btn-primary">Place Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
