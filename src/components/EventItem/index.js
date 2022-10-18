import "./index.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const EventItem = (props) => {
  const { eventDetails } = props;
  const { eventImageUrl, eventName, id } = eventDetails;
  const url = `/events/${id}`;

  return (
    <div className="event-container">
      <Link to={url} className="link">
        <img src={eventImageUrl} alt={eventName} className="event-image" />
        <div className="mini-event-text">
          <p>{eventName}</p>
          <BsArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default EventItem;
