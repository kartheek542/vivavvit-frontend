import { Component } from "react";
import Header from "../Header";
import withRouter from "../withRouter";
import Loader from "../Loader";
import "./index.css";

class EventDetailItem extends Component {
  state = {
    eventName: "Event",
    eventDescription: `Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ultricies et, tellus. Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis. Suspendisse ut massa. Cras nec ante. Pellentesque a nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tincidunt urna. Nulla ullamcorper vestibulum turpis. Pellentesque cursus luctus mauris.`,
    eventImageUrl: "https://picsum.photos/400/300",
    eventVenue: "OAT",
    eventDate: "00-00-00",
    eventTime: "10AM",
    isLoading: true,
  };
  componentDidMount() {
    this.fetchEventDetails();
  }
  fetchEventDetails = async () => {
    const { params } = this.props;
    const { id } = params;
    const url = `https://vivavvit.herokuapp.com/events/${id}/`;
    const response = await fetch(url);
    const jsonData = await response.json();
    this.setState({
      eventName: jsonData.eventName,
      eventDescription: jsonData.description,
      eventDate: jsonData.date,
      eventTime: jsonData.time,
      eventVenue: jsonData.venue,
      eventImageUrl: jsonData.imageUrl2,
      isLoading: false,
    });
  };
  render() {
    const {
      eventName,
      eventDescription,
      eventImageUrl,
      eventDate,
      eventTime,
      eventVenue,
      isLoading
    } = this.state;
    return isLoading ? (
      <Loader color="#00bfff" height={50} width={50} />
    ) : (
      <div>
        <Header title={eventName} />
        <div className="event-detail-body-container">
          <div className="event-detail-matter-container">
            <div>
              <h1>About the event</h1>
              <p>{eventDescription}</p>
            </div>
            <div className="event-detail-details">
              <p>
                <span className="detail-desc">Venue</span>: {eventVenue}
              </p>
              <p>
                <span className="detail-desc">Event Date</span>: {eventDate}
              </p>
              <p>
                <span className="detail-desc">Event Time</span>: {eventTime}
              </p>
            </div>
          </div>
          <div className="event-detail-image-container">
            <img
              src={eventImageUrl}
              alt="event detail"
              className="event-detail-image"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetailItem);
