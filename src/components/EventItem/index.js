import "./index.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const EventItem = (props) => {
  const { eventDetails } = props;
  const { eventImageUrl, eventName, id, registered } = eventDetails;
  const url = `/events/${id}`;

  return (
    <div className="event-container">
      <Link to={url} className="link">
        <img src={eventImageUrl} alt={eventName} className="event-image" />
        <div className="mini-event-text">
          <div>
            <p className="event-item-name">{eventName}</p>
            <p className="event-register-number">Registered: {registered}</p>
          </div>
          <BsArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default EventItem;
