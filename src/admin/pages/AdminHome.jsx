

export default function Home() {
  const statusText = "Admin"; // 👈 change text freely

  return (
    <>

      <hr className="divider_head" />

      {/* HERO */}
      <div className="hero">
        <h1>
          <span className="col_t">Sport</span> Connect
        </h1>
        <p>
          Manage facilities, schedule matches, and book sports courts
          effortlessly with our all-in-one sports management system.
        </p>
        <button onClick={() => (window.location.href = "/booking")}>
          Book a Facility
        </button>
      </div>

      {/* STATUS BOX */}
      <div className="container mt-5 text-center">
        <div className="status-box mx-auto">
          <span
            className="typewriter"
            style={{
              "--chars": statusText.length,
              "--text-width": `${statusText.length}ch`,
            }}
          >
            {statusText}
          </span>
        </div>
      </div>

      <br /><br /><br />

      {/* ABOUT */}
      <div className="container mt-4">
        <div className="row g-4 justify-content-center">
          <div className="col-md-3 mb-4 mb-md-0 me-md-4">
            <div className="info-box d-flex flex-column justify-content-center h-100 py-5">
              <span className="lsp">
                <span className="col_t">❝ Champions</span> are{" "}
                <span className="col_t">made,</span> not{" "}
                <span className="col_t">born ❞</span>
              </span>
            </div>
          </div>

          {[
            ["2020", "Founded Year"],
            ["5000+", "Members"],
            ["15+", "Sports"],
            ["25+", "Facilities"],
          ].map(([value, label]) => (
            <div className="col-md-2" key={label}>
              <div className="info-box d-flex flex-column justify-content-center h-100">
                <h4 className="mb-0 fw-bold col_t">{value}</h4>
                <small>{label}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br /><br /><br /><br />
      <hr className="divider under_about" />
      <br /><br /><br />

      {/* FEATURES */}
      <div className="container mt-5">
        <h3 className="section-title">Why Sport Connect?</h3>
        <div className="row g-4 text-center">
          {[
            ["bi-calendar-check", "Easy Booking", "Book courts and facilities in seconds."],
            ["bi-people-fill", "Team Management", "Manage players, teams, and schedules."],
            ["bi-bar-chart-line-fill", "Performance Tracking", "Track performance and facility usage."],
            ["bi-shield-check", "Secure System", "Your data is protected and safe."],
          ].map(([icon, title, desc]) => (
            <div className="col-md-4 col-lg-3" key={title}>
              <div className="feature-card">
                <i className={`bi ${icon}`}></i>
                <h5>{title}</h5>
                <p className="text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br /><br /><br /><br />

      {/* HOW IT WORKS */}
      <div className="container mt-5">
        <h3 className="section-title">How It Works</h3>
        <div className="row g-4">
          {["Choose a Sport", "Book a Facility", "Play & Track History"].map(
            (text, i) => (
              <div className="col-md-4" key={text}>
                <div className="step-card">
                  <div className="step-number">{`0${i + 1}`}</div>
                  {text}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <br /><br /><br /><br /><br />

      {/* POPULAR SPORTS */}
      <div className="container mt-3">
        <h3 className="section-title">Popular Sports</h3>
        <div className="row gy-4 mt-2 justify-content-center">
          {[
            ["tennis", "Tennis Court"],
            ["soccer", "Soccer Court"],
            ["basketball", "Basketball Court"],
            ["badminton", "Badminton Court"],
            ["volleyball", "Volleyball Court"],
          ].map(([img, label]) => (
            <div className="col-6 col-md-3 col-lg-2" key={label}>
              <div
                className="sport-cards"
                style={{
                  backgroundImage: `url(/src/assets/img/${img}.jpeg)`,
                }}
              >
                <div className="sport-overlay">
                  <p className="mt-2">{label}</p>
                  <button
                    className="book-btn"
                    onClick={() => (window.location.href = "/booking")}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
      <div className="mt-auto text-center">
        <button
          className="px-4 py-2 seemore"
          onClick={() => (window.location.href = "/booking")}
        >
          See More
        </button>
      </div>

      <br /><br /><br /><br /><br />
    </>
  );
}
