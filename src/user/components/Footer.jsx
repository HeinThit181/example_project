import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="site-footer">
        <div className="footer-container">

          {/* ===== Brand ===== */}
          <div className="footer-section">
            <h3>
              Sport <span className="towhite">Connect</span>
            </h3>
            <p className="togray">
              Book, play, and manage sports facilities with ease.
            </p>
          </div>

          {/* ===== Navigation ===== */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><Link to="/buddies">Sport Buddies</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/account">Account</Link></li>
            </ul>
          </div>

          {/* ===== Contact ===== */}
          <div className="footer-section">
            <h4>Contact</h4>
            <p className="togray">Email: sportconnect@gmail.com</p>
            <p className="togray">Location: Thailand</p>
          </div>

        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="footer-bottom togray">
        <p>© 2026 Sport Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}
