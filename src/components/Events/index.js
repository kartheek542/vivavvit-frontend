import { Component } from "react";
import Header from "../Header";
import EventItem from "../EventItem";
import "./index.css";

const CATEGORY = "SPORTS";
const generateEvents = (total) => {
  let totalEvents = [];
  const eachCategory = parseInt(total / 3);
  const availableCategories = ["SPORTS", "CULTURAL", "TECHNICAL"];
  let cid = 1;
  availableCategories.forEach((category) => {
    for (let i = 0; i < eachCategory; i++) {
      totalEvents.push({
        id: cid++,
        eventImageUrl: "https://picsum.photos/200/200",
        eventName: category.toLowerCase(),
        eventCategory: category,
      });
    }
  });
  return totalEvents;
};

class Events extends Component {
  state = {
    activeCategory: CATEGORY,
    events: generateEvents(30),
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
    })
  }
  setCategory = (newCategory) => {
    this.setState({ activeCategory: newCategory });
  };
  render() {
    const { activeCategory, events } = this.state;
    const filteredEvents = events.filter(eachEvent => eachEvent.eventCategory === activeCategory)
    return (
      <div>
        <Header title="Events" />
        <h1>The active category is {activeCategory}</h1>
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
        <div>
            {filteredEvents.map(eachEvent => (
                <EventItem key={eachEvent.id} eventDetails={eachEvent} />
            ))}
        </div>
      </div>
    );
  }
}

export default Events;
