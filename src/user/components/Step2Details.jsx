import { useEffect } from "react";
import "../../styles/user.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function Step2Details({ next, skip }) {

  // 🔹 TIME GENERATOR (same as HTML)
  function generateTimes(date = "") {
    const selected = document.getElementById("timeSelected");
    const optionsBox = document.getElementById("timeOptions");
    const hiddenInput = document.getElementById("bookingTime");

    if (!selected || !optionsBox) return;

    const disabledTimesByDate = {
      "2026-01-26": ["10:00", "10:30", "11:00"],
      "2026-01-28": ["14:00", "14:30"],
      "2026-02-01": ["18:00", "18:30", "19:00"],
    };

    optionsBox.innerHTML = "";
    selected.textContent = "Select time";
    hiddenInput.value = "";
    selected.classList.remove("has-value");

    const disabledTimes = disabledTimesByDate[date] || [];

    for (let h = 9; h <= 22; h++) {
      for (let m of [0, 30]) {
        if (h === 22 && m > 0) break;

        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const div = document.createElement("div");
        div.textContent = time;

        if (disabledTimes.includes(time)) {
          div.classList.add("disabled");
        } else {
          div.onclick = () => {
            selected.textContent = time;
            hiddenInput.value = time;
            selected.classList.add("has-value");
            document.querySelector(".time-dropdown")?.classList.remove("active");
          };
        }

        optionsBox.appendChild(div);
      }
    }
  }

  // 🔹 FLATPICKR (your design)
  useEffect(() => {
    const closedDates = ["2026-01-25", "2026-02-01"];

    flatpickr("#bookingDate", {
      minDate: "today",
      maxDate: "2026-12-31",
      dateFormat: "Y-m-d",
      disable: closedDates,
      allowInput: false,
      onChange: ([date]) => {
        generateTimes(date?.toISOString().split("T")[0]);
      },
    });

    generateTimes();
  }, []);

  // 🔹 HOUR STEPPER (unchanged)
  useEffect(() => {
    const minus = document.getElementById("minusHour");
    const plus = document.getElementById("plusHour");
    const input = document.getElementById("hourValue");

    if (!minus || !plus || !input) return;

    const MIN = 0.5;
    const MAX = 13;
    const STEP = 0.5;

    minus.onclick = () => {
      let v = parseFloat(input.value);
      input.value = v - STEP >= MIN ? (v - STEP).toFixed(1) : MIN;
    };

    plus.onclick = () => {
      let v = parseFloat(input.value);
      input.value = v === 0 ? MIN : Math.min(v + STEP, MAX).toFixed(1);
    };
  }, []);

  return (
    <>
      <hr className="divider_head" />
      <div className="search-card text-center box_fill booking-card-info">
        <h4>Booking Court</h4>
        <br />

        <div className="mt-4 text-start">
          <label className="form-label">Date</label>
          <input
            type="text"
            id="bookingDate"
            className="form-control no-icon neo-ic-date bookdd"
            placeholder="Select date"
            readOnly
          />
        </div>

        <div className="mt-4 text-start">
          <label className="form-label">Time</label>
          <div
            className="time-dropdown"
            onClick={() =>
              document.querySelector(".time-dropdown")?.classList.toggle("active")
            }
          >
            <div className="time-selected" id="timeSelected">Select time</div>
            <div className="time-options" id="timeOptions"></div>
          </div>
          <input type="hidden" id="bookingTime" />
        </div>

        <div className="mt-4 text-start">
          <label className="form-label">Number of hours</label>
          <div className="hour-stepper">
            <button type="button" id="minusHour" className="step-btn">−</button>
            <input type="text" id="hourValue" value="0" readOnly />
            <button type="button" id="plusHour" className="step-btn">+</button>
          </div>
        </div>

        <br />

        {/* 🔥 EXACT SAME BUTTONS */}
        <button id="search-btn" className="mt-4 me-3" onClick={next}>
          Select Court
        </button>

        <button id="search-btn" className="mt-4" onClick={skip}>
          Book now
        </button>
      </div>
      <br/><br/><br/><br/><br/><br/>
    </>
  );
}
