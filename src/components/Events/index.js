import { Component } from "react";
import Loader from "../Loader"
import Header from "../Header";
import EventItem from "../EventItem";
import "./index.css";

const CATEGORY = "SPORTS";

class Events extends Component {
  state = {
    activeCategory: CATEGORY,
    events: [],
    isLoading: true,
  };
  componentDidMount() {
    this.fetchEventDetails();
  }
  fetchEventDetails = async () => {
    const url ="https://vivavvit.herokuapp.com/events"
    const  response = await fetch(url);
    const jsonData = await response.json();
    const convertedData = jsonData.map(eachItem => ({
      id: eachItem.eventId,
      eventName: eachItem.eventName,
      eventCategory: eachItem.category.toUpperCase(),
      eventImageUrl: eachItem.imageUrl,
    }))
    this.setState({
      events: convertedData,
      isLoading: false,
    })
  }
  setCategory = (newCategory) => {
    this.setState({ activeCategory: newCategory });
  };
  render() {
    const { activeCategory, events, isLoading } = this.state;
    const filteredEvents = events.filter(eachEvent => eachEvent.eventCategory === activeCategory)
    return (isLoading) ? (
      <Loader color="#00bfff" height={50} width={50} />
    ) : (
      <div>
        <Header title="Events" />
        <div>
          <button type="button" onClick={() => this.setCategory("SPORTS")}>
            SPORTS
          </button>
          <button type="button" onClick={() => this.setCategory("TECHNICAL")}>
            TECHNICAL
          </button>
          <button type="button" onClick={() => this.setCategory("CULTURAL")}>
            CULTURAL
          </button>
        </div>
        <div className="events-list-container">
            {filteredEvents.map(eachEvent => (
                <EventItem key={eachEvent.id} eventDetails={eachEvent} />
            ))}
        </div>
      </div>
    );
  }
}

export default Events;
