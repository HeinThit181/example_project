import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../../styles/user.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingList() {
  const navigate = useNavigate();

  const dateRef = useRef(null);
  const dateMobileRef = useRef(null);
  const picker = useRef(null);
  const pickerMobile = useRef(null);

  /* ================= FLATPICKR ================= */
  useEffect(() => {
    const closedDates = ["2026-01-25", "2026-02-01"];

    if (dateRef.current) {
      picker.current = flatpickr(dateRef.current, {
        minDate: "today",
        maxDate: "2026-12-31",
        dateFormat: "Y-m-d",
        disable: closedDates,
        allowInput: false,
      });
    }

    if (dateMobileRef.current) {
      pickerMobile.current = flatpickr(dateMobileRef.current, {
        minDate: "today",
        maxDate: "2026-12-31",
        dateFormat: "Y-m-d",
        disable: closedDates,
        allowInput: false,
      });
    }

    const forceCloseCalendar = () => {
      picker.current?.close();
      pickerMobile.current?.close();
    };

    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".flatpickr-calendar") &&
        !e.target.closest(".bookdd")
      ) {
        picker.current?.close();
        pickerMobile.current?.close();
      }
    };

    document.addEventListener("scroll", forceCloseCalendar, true);
    document.addEventListener("touchmove", forceCloseCalendar, true);
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      picker.current?.destroy();
      pickerMobile.current?.destroy();
      document.removeEventListener("scroll", forceCloseCalendar, true);
      document.removeEventListener("touchmove", forceCloseCalendar, true);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  /* ================= RESET FILTER ================= */
  const resetFilters = () => {
    document
      .querySelectorAll('.filter-panel input[type="checkbox"]')
      .forEach(cb => (cb.checked = false));

    picker.current?.clear();
    pickerMobile.current?.clear();

    const offcanvasEl = document.getElementById("mobileFilter");
    if (offcanvasEl?.classList.contains("show")) {
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  };

  return (
    <>
      <Navbar />
      <hr className="divider_head" />
      <br/>

      <div className="booking-page py-5 container">
        <div className="row g-5">

          {/* ================= LEFT ================= */}
          <div className="col-lg-8">

            {/* Mobile Filter Button */}
            <div className="d-lg-none mb-4">
              <button
                className="btn fliter-sort w-100"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileFilter"
              >
                <i className="bi bi-sliders me-2"></i> Filters
              </button>
            </div>

            {[
              "badminton",
              "basketball",
              "running",
              "soccer",
              "tennis",
              "volleyball",
            ].map(sport => (
              <div className="sport-card" key={sport}>
                <img src={`/src/assets/img/${sport}.jpeg`} alt={sport} />

                <div className="sport-infob">
                  <h4>{sport.charAt(0).toUpperCase() + sport.slice(1)}</h4>
                  <p>High-quality indoor court with lighting.</p>

                  <div className="meta">
                    <span>🕒 08:00 – 22:00</span>
                    <span>🏟 Indoor</span>
                  </div>
                </div>

                <button
                  className="book-btn"
                  onClick={() => navigate("/booking/flow")}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP FILTER ================= */}
          <div className="col-lg-4 d-none d-lg-block">
            <aside className="filter-panel">
              <h5>Filters</h5>

              <div className="filter-section">
                <span className="filter-title">Sport Type</span>
                {["Soccer", "Volleyball", "Basketball", "Tennis", "Running", "Badminton"].map(s => (
                  <label className="check" key={s}>
                    <input type="checkbox" />
                    <span></span> {s}
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <span className="filter-title">Date</span>
                <input
                  ref={dateRef}
                  className="form-control dark-input bookdd"
                  id="bookingDate"
                  placeholder="Select date"
                  readOnly
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
            </aside>
          </div>
        </div>
        <br/>
      </div>

      {/* ================= MOBILE FILTER ================= */}
      <div
        className="offcanvas offcanvas-bottom bg-dark text-white"
        id="mobileFilter"
        style={{ height: "85vh", borderRadius: "20px 20px 0 0" }}
      >
        <div className="offcanvas-header">
          <h5 className="text-success">Filters</h5>
          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body p-3">
          <aside className="filter-panel border-0 shadow-none p-3 rounded-4">

            <div className="filter-section">
              <span className="filter-title">Sport Type</span>
              {["Soccer", "Volleyball", "Basketball", "Tennis", "Running", "Badminton"].map(s => (
                <label className="check" key={s}>
                  <input type="checkbox" />
                  <span></span> {s}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <span className="filter-title">Date</span>
              <input
                ref={dateMobileRef}
                className="form-control dark-input bookdd"
                id="bookingDate"
                placeholder="Select date"
                readOnly
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

            <button className="reset-btn w-100 mt-3" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>
        </div>
      </div>

      <br /><br /><br />
      <Footer />
    </>
  );
}
