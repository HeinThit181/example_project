import "../../styles/user.css";

export default function Step6CreditCard({ onDone }) {
  return (
    <>
      <hr className="divider_head" />
      <div className="search-card text-center box_fill ccard-box">
        <h4>UWWBW Bank</h4>
        <h4>Mr. Saw Min Thant</h4>
        <h4>666-1-0-10911-7</h4>

        <br />

        <button
          id="search-btn"
          className="mt-3"
          onClick={onDone}
        >
          Done
        </button>
      </div>
      <br/><br/><br/><br/><br/><br/>
    </>
  );
}
