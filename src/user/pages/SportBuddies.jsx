import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ---------- Buddy Row Component ---------- */
function BuddyRow({ buddy }) {
  return (
    <div className="sc-buddy-row">
      <div>
        <img
          src={buddy.img}
          alt={buddy.name}
          className="sc-buddy-avatar"
        />
      </div>
      <div>{buddy.name}</div>
      <div>
        <button className="sc-send-btn">Send</button>
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function SportBuddies() {
  const [sport, setSport] = useState("");
  const [gender, setGender] = useState("");
  const [sportOpen, setSportOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const sportRef = useRef(null);
  const genderRef = useRef(null);

  /* ---------- Close dropdowns on outside click ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sportRef.current && !sportRef.current.contains(e.target)) {
        setSportOpen(false);
      }
      if (genderRef.current && !genderRef.current.contains(e.target)) {
        setGenderOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = () => {
    setShowPanel(true);
  };

  /* ---------- Dummy Buddy Data ---------- */
  const buddies = [
    {
      id: 1,
      name: "Alex Tan",
      gender: "male",
      sport: "football",
      img: "/src/assets/img/person1.jpeg",
    },
    {
      id: 2,
      name: "Jamie Lee",
      gender: "female",
      sport: "badminton",
      img: "/src/assets/img/person2.jpeg",
    },
    {
      id: 3,
      name: "Chris Wong",
      gender: "male",
      sport: "basketball",
      img: "/src/assets/img/person3.jpeg",
    },
  ];

  /* ---------- Filtering ---------- */
  const filteredBuddies = buddies.filter((buddy) => {
    const sportMatch = sport ? buddy.sport === sport : true;
    const genderMatch =
      !gender || gender === "Any"
        ? true
        : buddy.gender === gender.toLowerCase();

    return sportMatch && genderMatch;
  });

  return (
    <>
      <Navbar />
      <hr className="divider_head" />

      <div className="search-card text-center box_fill">

        <h4>Find your sport buddies</h4>
        <br/>

        {/* ---------- SPORT DROPDOWN ---------- */}
        <div className="mt-4 text-start">
          <label className="form-label">Sports</label>

          <div
            ref={sportRef}
            className={`custom-dropdown ${sportOpen ? "active" : ""}`}
          >
            <div
              className={`dropdown-selected ${sport ? "has-value" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setSportOpen(!sportOpen);
              }}
            >
              {sport || "Select a sport"}
              <span className="dropdown-arrow">▾</span>
            </div>

            <div className="dropdown-options">
              {[
                "Football",
                "Badminton",
                "Basketball",
                "Running",
                "Tennis",
                "Volleyball",
              ].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSport(item.toLowerCase());
                    setSportOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- GENDER DROPDOWN ---------- */}
        <div className="mt-4 text-start">
          <label className="form-label">Buddy's Gender</label>

          <div
            ref={genderRef}
            className={`custom-dropdown ${genderOpen ? "active" : ""}`}
          >
            <div
              className={`dropdown-selected ${gender ? "has-value" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setGenderOpen(!genderOpen);
              }}
            >
              {gender || "Select gender preference"}
              <span className="dropdown-arrow">▾</span>
            </div>

            <div className="dropdown-options">
              {["Male", "Female", "Any"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setGender(item);
                    setGenderOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <br/><br/><br/>

        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br/><br/><br/><br/>

      {/* ---------- RESULT PANEL ---------- */}
      {showPanel && (
        <div className="sc-buddy-panel">
          <div className="sc-buddy-scroll">
            <div className="sc-buddy-header">
              <h5>Available Buddies</h5>
              <button
                className="sc-close-neon"
                onClick={() => setShowPanel(false)}
              >
                ✕
              </button>
            </div>

            <div className="sc-buddy-table-head">
              <div>Avatar</div>
              <div>Name</div>
              <div>Action</div>
            </div>

            {filteredBuddies.length > 0 ? (
              filteredBuddies.map((buddy) => (
                <BuddyRow key={buddy.id} buddy={buddy} />
              ))
            ) : (
              <p className="text-center mt-4">No buddies found</p>
            )}
          </div>
        </div>
      )}

      <br /><br /><br />
      <Footer />
    </>
  );
}
