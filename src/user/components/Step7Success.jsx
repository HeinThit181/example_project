import "../../styles/user.css";

export default function Step7Success({ bookingData }) {
  return (
    <>
      <hr className="divider_head" />

      <div className="search-card text-center box_fill book-payment-box">
        <h4>Booking Confirmed!</h4>
        <br />

        <div className="detail-box p-4 rounded-4">
          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Customer Name</div>
            <div className="col-7 fw-bold">
              {bookingData.customerName || "Saw Min Thant"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Booking ID</div>
            <div className="col-7 fw-bold">
              {bookingData.bookingId || "SC-20251210-001"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Time</div>
            <div className="col-7 fw-bold">
              {bookingData.time || "18:00 - 20:00"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Date</div>
            <div className="col-7 fw-bold">
              {bookingData.date || "6/12/2025"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Type of sport</div>
            <div className="col-7 fw-bold">
              {bookingData.sport || "Basketball"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Court</div>
            <div className="col-7 fw-bold">
              {bookingData.court || "Court 1"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">
              Payment Method
            </div>
            <div className="col-7 fw-bold">
              {bookingData.paymentMethod || "Credit Card"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Payment</div>
            <div className="col-7 fw-bold text-success">
              {bookingData.amount || "$50.00"}
            </div>
          </div>
        </div>

        <br />

        <button
          id="search-btn"
          className="mt-3 me-3"
          onClick={() => (window.location.href = "/booking")}
        >
          Return
        </button>

        <button
          id="search-btn"
          className="mt-3"
          onClick={() => alert("Booking saved")}
        >
          Saved
        </button>
      </div>

      <br /><br /><br /><br />
    </>
  );
}
