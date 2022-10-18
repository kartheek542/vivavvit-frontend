import { Component } from "react";
import Header from "../Header";
import withRouter from "../withRouter";
import "./index.css";

class EventDetailItem extends Component {
  state = {
    eventName: "Event",
    eventDescription: `Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ultricies et, tellus. Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis. Suspendisse ut massa. Cras nec ante. Pellentesque a nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tincidunt urna. Nulla ullamcorper vestibulum turpis. Pellentesque cursus luctus mauris.`,
    eventImageUrl: "https://picsum.photos/400/300",
    eventVenue: 'OAT',
    eventDate: '00-00-00',
    eventTime: '10AM',
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
    })
  };
  render() {
    const { eventName, eventDescription, eventImageUrl, eventDate, eventTime, eventVenue } = this.state;
    return (
      <div>
        <Header title={eventName} />
        <div>
          <div>
            <h1>About the event</h1>
            <p>{eventDescription}</p>
            <p><span>Venue</span>: {eventVenue}</p>
            <p><span>Event Date</span>: {eventDate}</p>
            <p><span>Event Time</span>: {eventTime}</p>
          </div>
          <div>
            <img src={eventImageUrl} alt="event detail" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetailItem);
