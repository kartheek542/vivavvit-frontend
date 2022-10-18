import "./index.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const EventItem = (props) => {
  const { eventDetails } = props;
  const { eventImageUrl, eventName, id } = eventDetails;
  const url = `/events/${id}`;

  return (
    <div>
      <Link to={url}>
        <img src={eventImageUrl} alt={eventName} />
        <div>
          <p>{eventName}</p>
          <BsArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default EventItem;
