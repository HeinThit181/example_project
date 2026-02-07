import "../../styles/user.css";

export default function Step3Court({ next }) {
  return (
    <>
    <hr className="divider_head" />
    <div className="container mt-4">
      

      {/* COURT GRID */}
      <div className="row justify-content-center text-center g-5">
        <div className="col-md-4">
          <div
            className="court-card text-center box_fill booking-card-info"
            style={{ backgroundImage: "url('/src/assets/img//tennis.jpeg')" }}
          >
            <h5 className="court-num">Tennis Court</h5>
            <button className="mt-2" onClick={next}>
              Book
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="court-card text-center box_fill booking-card-info"
            style={{ backgroundImage: "url('/src/assets/img//tennis.jpeg')" }}
          >
            <h5 className="court-num">Tennis Court</h5>
            <button className="mt-2" onClick={next}>
              Book
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="court-card text-center box_fill booking-card-info"
            style={{ backgroundImage: "url('/src/assets/img//tennis.jpeg')" }}
          >
            <h5 className="court-num">Tennis Court</h5>
            <button className="mt-2" onClick={next}>
              Book
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center text-center g-5 mt-3">
        <div className="col-md-4">
          <div
            className="court-card text-center box_fill booking-card-info"
            style={{ backgroundImage: "url('/src/assets/img//tennis.jpeg')" }}
          >
            <h5 className="court-num">Tennis Court</h5>
            <button className="mt-2" onClick={next}>
              Book
            </button>
          </div>
        </div>
      </div>
      
    </div>
    <br/><br/><br/><br/><br/>
    </>
  );
}
