import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ================= CARD COMPONENT ================= */
function BookingCard({ status, badge, createdAt, now }) {
  const isRecentUpcoming =
    status === "Upcoming" &&
    createdAt &&
    now - createdAt <= 30 * 60 * 1000; // 30 mins

  return (
    <>
      <div className="booking-card p-4 mb-4 rounded-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-4">
            <div
              className="sport-card-img d-flex flex-column justify-content-end p-3"
              style={{ backgroundImage: "url('/src/assets/img/tennis.jpeg')" }}
            >
              <div className="text-white overlay-text">
                <div className="fw-bold fs-5">
                  Basketball
                  <span className={`badge ${badge} ms-2`}>{status}</span>
                </div>
                <small className="text-light">
                  Dec 10, 2025 • 18:00
                  <i className="bi bi-geo-alt-fill ms-2"></i> AU Sports Center Court 1
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-8 desc-section d-flex flex-column justify-content-center">
            <h3 className="fw-bold text-center mb-4">Booking Details</h3>

            <div className="detail-box p-4 rounded-4">
              {[
                ["Customer Name", "Saw Min Thant"],
                ["Booking ID", "SC-20251210-001"],
                ["Time", "18:00 - 20:00"],
                ["Payment", "$50.00"],
                ["Payment Method", "Credit Card (VISA)"],
              ].map(([k, v]) => (
                <div className="row mb-3" key={k}>
                  <div className="col-5 fw-semibold text-secondary">{k}</div>
                  <div className="col-7 fw-bold">{v}</div>
                </div>
              ))}
            </div>

            <div className="text-md-end text-center mt-4">
              {isRecentUpcoming ? (
                <>
                  <button className="px-4 py-2 booking-btn me-3">
                    Cancel
                  </button>
                  <button className="px-4 py-2 booking-btn">
                    Modify
                  </button>
                </>
              ) : (
                <button
                  className="px-4 py-2 booking-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#rateModal"
                >
                  Rate us
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br /><br /><br />
      <Footer />
    </>
  );
}

/* ================= HISTORY PAGE ================= */
export default function History() {
  const [showSort, setShowSort] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const dateRef = useRef(null);
  const pickerRef = useRef(null);

  // ✅ React-safe current time (no impure render)
  const [now] = useState(() => Date.now());

  /* ===== Flatpickr ===== */
  useEffect(() => {
    pickerRef.current = flatpickr(dateRef.current, {
      minDate: "today",
      maxDate: "2026-12-31",
      dateFormat: "Y-m-d",
      static: true,

      // ✅ FIX: force desktop calendar on mobile
      disableMobile: true,
    });

    return () => pickerRef.current?.destroy();
  }, []);

  /* ===== Close filter when clicking outside ===== */
  useEffect(() => {
    const handleClick = () => setShowSort(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const resetFilters = () => {
    document
      .querySelectorAll('.sort-panel input[type="checkbox"]')
      .forEach(cb => (cb.checked = false));

    pickerRef.current?.clear();
    setShowSort(false);
  };

  const submitRating = () => {
    if (!selectedRating) {
      alert("Please select a rating ⭐");
      return;
    }
    alert(`Thank you for rating us ${selectedRating} stars!`);
    setSelectedRating(0);
  };

  return (
    <>
      <Navbar />
      <hr className="divider_head" />

      {/* ================= FILTER ================= */}
      <div className="container py-5">
        <div className="d-flex justify-content-end align-items-center mb-4">
          <div className="sort-dropdown-lg">
            <button
              className="sort-btn"
              onClick={e => {
                e.stopPropagation();
                setShowSort(prev => !prev);
              }}
            >
              Sort & Filter <i className="bi bi-chevron-down"></i>
            </button>

            <div
              className={`sort-panel ${showSort ? "show" : ""}`}
              onClick={e => e.stopPropagation()}
            >
              <h5 className="sort-title">Filters</h5>

              <div className="filter-section">
                <span className="filter-title">Sport Type</span>
                {["Soccer", "Volleyball", "Basketball", "Tennis", "Running", "Badminton"].map(
                  s => (
                    <label className="check" key={s}>
                      <input type="checkbox" />
                      <span></span> {s}
                    </label>
                  )
                )}
              </div>

              <div className="filter-section">
                <span className="filter-title">Date</span>
                <input
                  ref={dateRef}
                  className="form-control dark-input full-width-date bookdd"
                  id="bookingDate"
                  placeholder="Select date"
                />
              </div>

              <div className="filter-section">
                <span className="filter-title">Time</span>
                {["Morning", "Afternoon", "Evening"].map(t => (
                  <label className="check" key={t}>
                    <input type="checkbox" />
                    <span></span> {t}
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <span className="filter-title">Court Type</span>
                {["Indoor", "Outdoor"].map(c => (
                  <label className="check" key={c}>
                    <input type="checkbox" />
                    <span></span> {c}
                  </label>
                ))}
              </div>

              <button className="reset-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <br /><br /><br />

        {/* ================= CARDS ================= */}
        <BookingCard
          status="Upcoming"
          badge="bg-success"
          createdAt={now - 10 * 60 * 1000}
          now={now}
        />

        <BookingCard
          status="Upcoming"
          badge="bg-success"
          createdAt={now - 60 * 60 * 1000}
          now={now}
        />

        <BookingCard status="Ongoing" badge="bg-warning" />
        <BookingCard status="Completed" badge="bg-danger" />
        <BookingCard status="Completed" badge="bg-danger" />
      </div>

      {/* ================= RATE MODAL ================= */}
      <div className="modal fade" id="rateModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-body text-center">
              <h5 className="modal-title fw-bold text-white mb-3">
                Rate Your Experience
              </h5>

              <div className="rating mb-3">
                {[1, 2, 3, 4, 5].map(n => (
                  <i
                    key={n}
                    className={`bi bi-star star ${selectedRating >= n ? "active" : ""}`}
                    onClick={() => setSelectedRating(n)}
                  ></i>
                ))}
              </div>

              <button className="btn booking-btn px-4" onClick={submitRating}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
