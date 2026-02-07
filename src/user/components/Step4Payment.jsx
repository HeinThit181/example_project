import { useEffect, useRef } from "react";
import "../../styles/user.css";

export default function Step4Payment({ setBookingData, next }) {
  const dropdownRef = useRef(null);
  const selectedRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dropdownRef.current.classList.remove("active");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("active");
  };

  const selectPayment = (value) => {
    selectedRef.current.textContent = value;
    selectedRef.current.classList.add("has-value");
    inputRef.current.value = value;
    dropdownRef.current.classList.remove("active");
  };

  const handleConfirm = () => {
    const method = inputRef.current.value;

    if (!method) {
      alert("Please select a payment method");
      return;
    }

    setBookingData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));

    next(); // ALWAYS go to confirm page
  };

  return (
    <>
      <hr className="divider_head" />
      <div className="search-card text-center box_fill payment-box">
        <h4>Confirm Payment</h4>

        <br /><br />

        <div className="mt-4 text-start">
          <label className="form-label">Payment Method</label>

          <div className="payment-dropdown" ref={dropdownRef}>
            <div
              className="payment-selected"
              ref={selectedRef}
              onClick={toggleDropdown}
            >
              Select payment method
              <span className="dropdown-arrow">▾</span>
            </div>

            <div className="payment-options">
              <div onClick={() => selectPayment("Credit Card")}>
                Credit Card
              </div>
              <div onClick={() => selectPayment("QR Code")}>
                QR Code
              </div>
            </div>

            <input type="hidden" ref={inputRef} />
          </div>
        </div>

        <br /><br /><br />

        <button id="search-btn" className="mt-4" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      <br/><br/><br/><br/><br/><br/>
    </>
  );
}
