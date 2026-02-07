import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER
import Home from "./user/pages/Home";
import Profile from "./user/pages/Profile";
import History from "./user/pages/History";
import BookingList from "./user/pages/BookingList";
import BookingFlow from "./user/pages/BookingFlow";
import SportBuddies from "./user/pages/SportBuddies";

// ADMIN / STAFF
import AdminHome from "./admin/pages/AdminHome";
import StaffHome from "./staff/pages/StaffHome";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/booking" element={<BookingList />} />
        <Route path="/booking/flow" element={<BookingFlow />} />
        <Route path="/buddies" element={<SportBuddies />} />

        {/* ADMIN / STAFF */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/staff" element={<StaffHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
