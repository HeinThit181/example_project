import "../../styles/user.css";

export default function Step5Confirm({ next, back }) {
  return (
    <>
      <hr className="divider_head" />
      <div className="search-card text-center box_fill book-payment-box">
        <h4>Booking Details</h4>
        <br />

        <div className="detail-box p-4 rounded-4">
          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Customer Name</div>
            <div className="col-7 fw-bold">Saw Min Thant</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Booking ID</div>
            <div className="col-7 fw-bold">SC-20251210-001</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Time</div>
            <div className="col-7 fw-bold">18:00 - 20:00</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Date</div>
            <div className="col-7 fw-bold">6/12/2025</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Type of sport</div>
            <div className="col-7 fw-bold">Basketball</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Court</div>
            <div className="col-7 fw-bold">Court 1</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Payment Method</div>
            <div className="col-7 fw-bold">Credit Card</div>
          </div>

          <div className="row mb-3">
            <div className="col-5 fw-semibold text-secondary">Amount</div>
            <div className="col-7 fw-bold text-success">$50.00</div>
          </div>
        </div>

        <br />

        <button
          id="search-btn"
          className="mt-3 me-3"
          onClick={back}
        >
          Modify
        </button>

        <button
          id="search-btn"
          className="mt-3"
          onClick={next}
        >
          Paynow
        </button>
      </div>

      <br /><br />

      <h5 className="text-center text-danger">
        Notice: Customer cannot cancel or modify after 30 minutes of making payment
      </h5>
      <br/><br/><br/>
    </>
  );
}
