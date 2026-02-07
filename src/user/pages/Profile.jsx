// Profile.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Simple, theme-friendly SVG icons (inherit currentColor)
function EyeIcon({ off = false }) {
  return off ? (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Profile() {
  const avatarInputRef = useRef(null);

  const initialProfile = useMemo(
    () => ({
      username: "john_joe19",
      age: 20,
      gender: "Male",
      phone: "0123456789",
      email: "john20joe19@gmail.com",
      sport1: "Football",
      sport2: "Basketball",
      sport3: "Swimming",
      cardName: "John Joe",
      cardNumber: "**** **** **** 1234",
      expiry: "2028-07",
      cvv: "123",
      currentPassword: "********",
      newPassword: "",
      confirmPassword: "",
    }),
    []
  );

  const sports = useMemo(
    () => ["Football", "Basketball", "Cricket", "Tennis", "Badminton", "Swimming"],
    []
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const [avatarSrc, setAvatarSrc] = useState("/src/assets/img/aguy.avif");
  const [tempAvatarSrc, setTempAvatarSrc] = useState("/src/assets/img/aguy.avif");
  const [backupAvatar, setBackupAvatar] = useState("/src/assets/img/aguy.avif");

  const [form, setForm] = useState(initialProfile);
  const [backupForm, setBackupForm] = useState(initialProfile);

  const [pwError, setPwError] = useState("");

  const [pwVisible, setPwVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    const key = id?.replace("profile-", "");
    if (!key) return;

    setForm((prev) => ({
      ...prev,
      [key]: type === "number" ? Number(value) : value,
    }));
  };

  const showPwError = (msg) => setPwError(msg);
  const hidePwError = () => setPwError("");

  const validatePassword = () => {
    hidePwError();

    const newPw = (form.newPassword || "").trim();
    const confirmPw = (form.confirmPassword || "").trim();

    if (!newPw && !confirmPw) return true;

    if (newPw.length < 6) {
      showPwError("New password must be at least 6 characters.");
      return false;
    }
    if (newPw !== confirmPw) {
      showPwError("New password and confirm password do not match.");
      return false;
    }
    return true;
  };

  const resetEyeButtons = () => {
    setPwVisible({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const setViewMode = () => {
    setIsEditMode(false);
    hidePwError();
    resetEyeButtons();
  };

  const setEditMode = () => {
    setBackupForm(form);
    setBackupAvatar(avatarSrc);
    setTempAvatarSrc(avatarSrc);
    setIsEditMode(true);
    hidePwError();
  };

  const handleCancel = () => {
    setForm(backupForm);
    setAvatarSrc(backupAvatar);
    setTempAvatarSrc(backupAvatar);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
    setViewMode();
  };

  const handleSave = () => {
    if (!validatePassword()) return;

    setAvatarSrc(tempAvatarSrc);
    if (avatarInputRef.current) avatarInputRef.current.value = "";

    setViewMode();
    alert("Saved!");
  };

  const handleLogout = () => alert("Logged out");

  const togglePwVisibility = (fieldKey) => {
    setPwVisible((prev) => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === "string") setTempAvatarSrc(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setViewMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <hr className="divider_head" />
      <br/><br/><br/>

      <div className="container profile-shell">
        <div className="profile-page-card">
          <h2 className="profile-title">User Profile</h2>

          <div className="row g-4">
            {/* COLUMN 1: ONLY PICTURE */}
            <div className="col-12 col-lg-4">
              <div className="profile-panel">
                <div className="profile-section-title">Profile Picture</div>

                <div className="profile-pic-wrap">
                  <img
                    id="profile-avatar"
                    className="profile-avatar"
                    src={isEditMode ? tempAvatarSrc : avatarSrc}
                    alt="Profile Picture"
                  />

                  {isEditMode && (
                    <div id="profile-uploadRow" style={{ width: "100%" }}>
                      <label className="profile-label">Change Picture</label>
                      <input
                        id="profile-avatarInput"
                        ref={avatarInputRef}
                        className="profile-input"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFile}
                        disabled={!isEditMode}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: 2x2 cards */}
            <div className="col-12 col-lg-8">
              <div className="row g-4">
                {/* Card 1: Personal Info */}
                <div className="col-12 col-md-6">
                  <div className="profile-panel">
                    <div className="profile-section-title">Personal Information</div>

                    <div className="mb-3">
                      <label className="profile-label">Username</label>
                      <input
                        id="profile-username"
                        className="profile-input"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <label className="profile-label">Age</label>
                        <input
                          id="profile-age"
                          className="profile-input"
                          type="number"
                          value={form.age}
                          onChange={handleChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="profile-label">Gender</label>
                        <select
                          id="profile-gender"
                          className="profile-select"
                          value={form.gender}
                          onChange={handleChange}
                          disabled={!isEditMode}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="profile-label">Phone Number</label>
                      <input
                        id="profile-phone"
                        className="profile-input"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="mt-3">
                      <label className="profile-label">Email</label>
                      <input
                        id="profile-email"
                        className="profile-input"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Sports */}
                <div className="col-12 col-md-6">
                  <div className="profile-panel">
                    <div className="profile-section-title">Favourite Sports</div>

                    <div className="mb-3">
                      <label className="profile-label">Sport 1</label>
                      <select
                        id="profile-sport1"
                        className="profile-select"
                        value={form.sport1}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      >
                        {sports.map((s) => (
                          <option key={`s1-${s}`} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="profile-label">Sport 2</label>
                      <select
                        id="profile-sport2"
                        className="profile-select"
                        value={form.sport2}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      >
                        {sports.map((s) => (
                          <option key={`s2-${s}`} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="profile-label">Sport 3</label>
                      <select
                        id="profile-sport3"
                        className="profile-select"
                        value={form.sport3}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      >
                        {sports.map((s) => (
                          <option key={`s3-${s}`} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Card 3: Credit Card */}
                <div className="col-12 col-md-6">
                  <div className="profile-panel">
                    <div className="profile-section-title">Credit Card Information</div>

                    <div className="mb-3">
                      <label className="profile-label">Cardholder Name</label>
                      <input
                        id="profile-cardName"
                        className="profile-input"
                        type="text"
                        value={form.cardName}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="profile-label">Card Number</label>
                      <input
                        id="profile-cardNumber"
                        className="profile-input"
                        type="text"
                        value={form.cardNumber}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <label className="profile-label">Expiry Date</label>
                        <input
                          id="profile-expiry"
                          className="profile-input"
                          type="month"
                          value={form.expiry}
                          onChange={handleChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="profile-label">CVV</label>
                        <input
                          id="profile-cvv"
                          className="profile-input"
                          type="password"
                          value={form.cvv}
                          onChange={handleChange}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Password */}
                <div className="col-12 col-md-6">
                  <div className="profile-panel">
                    <div className="profile-section-title">Password</div>

                    <div className="mb-3">
                      <label className="profile-label">Current Password</label>
                      <div className="profile-password-wrap">
                        <input
                          id="profile-currentPassword"
                          className="profile-input"
                          type={pwVisible.currentPassword ? "text" : "password"}
                          value={form.currentPassword}
                          onChange={handleChange}
                          disabled={!isEditMode}
                        />
                        <button
                          type="button"
                          className="profile-eye-btn"
                          aria-label={pwVisible.currentPassword ? "Hide password" : "Show password"}
                          onClick={() => togglePwVisibility("currentPassword")}
                          disabled={!isEditMode}
                        >
                          <EyeIcon off={pwVisible.currentPassword} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="profile-label">New Password</label>
                      <div className="profile-password-wrap">
                        <input
                          id="profile-newPassword"
                          className="profile-input"
                          type={pwVisible.newPassword ? "text" : "password"}
                          value={form.newPassword}
                          onChange={handleChange}
                          placeholder="Enter new password"
                          disabled={!isEditMode}
                        />
                        <button
                          type="button"
                          className="profile-eye-btn"
                          aria-label={pwVisible.newPassword ? "Hide password" : "Show password"}
                          onClick={() => togglePwVisibility("newPassword")}
                          disabled={!isEditMode}
                        >
                          <EyeIcon off={pwVisible.newPassword} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="profile-label">Confirm New Password</label>
                      <div className="profile-password-wrap">
                        <input
                          id="profile-confirmPassword"
                          className="profile-input"
                          type={pwVisible.confirmPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                          disabled={!isEditMode}
                        />
                        <button
                          type="button"
                          className="profile-eye-btn"
                          aria-label={pwVisible.confirmPassword ? "Hide password" : "Show password"}
                          onClick={() => togglePwVisibility("confirmPassword")}
                          disabled={!isEditMode}
                        >
                          <EyeIcon off={pwVisible.confirmPassword} />
                        </button>
                      </div>
                    </div>

                    <p
                      id="profile-passwordError"
                      style={{
                        display: pwError ? "block" : "none",
                        marginTop: "10px",
                      }}
                    >
                      {pwError}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="row mt-4 justify-content-center justify-content-md-end">
            {!isEditMode ? (
              <div className="col-12 col-md-8 text-center text-md-end" id="profile-viewButtons">
                <div className="profile-actions justify-content-center justify-content-md-end">
                  <button
                    className="profile-btn-bottom profile-btn-fixed"
                    type="button"
                    id="profile-editBtn"
                    onClick={setEditMode}
                  >
                    Edit
                  </button>
                  <button
                    className="profile-btn-bottom profile-btn-danger profile-btn-fixed"
                    type="button"
                    id="profile-logoutBtn"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12 col-md-8 text-center text-md-end" id="profile-editButtons">
                <div className="profile-actions justify-content-center justify-content-md-end">
                  <button
                    className="profile-btn-bottom profile-btn-fixed"
                    type="button"
                    id="profile-saveBtn"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="profile-btn-bottom profile-btn-danger profile-btn-fixed"
                    type="button"
                    id="profile-cancelBtn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <br /><br /><br /><br /><br />
      <Footer />
    </>
  );
}
