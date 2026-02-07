export default function BuddyRow({ buddy }) {
    return (
      <div className="sc-buddy-row">
  
        <img
          src={buddy.img}
          alt={buddy.name}
          className="sc-buddy-avatar"
        />
  
        <div className="sc-buddy-name">
          {buddy.name}
        </div>
  
        <button
          className="sc-send-btn"
          onClick={() => alert(`Request sent to ${buddy.name}`)}
        >
          Send Request
        </button>
  
      </div>
    );
  }
  