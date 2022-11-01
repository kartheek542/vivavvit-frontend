import { Component } from "react";
import Loader from "../Loader";
import Header from "../Header";
import { CategoryButton } from "../styledComponents";
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
    const url = "https://vivavvit.herokuapp.com/events";
    const response = await fetch(url);
    const jsonData = await response.json();
    const convertedData = jsonData.map((eachItem) => ({
      id: eachItem.eventId,
      eventName: eachItem.eventName,
      eventCategory: eachItem.category.toUpperCase(),
      eventImageUrl: eachItem.imageUrl,
    }));
    this.setState({
      events: convertedData,
      isLoading: false,
    });
  };
  setCategory = (newCategory) => {
    this.setState({ activeCategory: newCategory });
  };
  render() {
    const { activeCategory, events, isLoading } = this.state;
    const filteredEvents = events.filter(
      (eachEvent) => eachEvent.eventCategory === activeCategory
    );
    return (
      <div className="events-page">
        <Header />
        {isLoading ? (
          <Loader color="#00bfff" height={50} width={50} />
        ) : (
          <>
            <div className="events-title">
              <h1 className="events-heading">Events</h1>
            </div>
            <div className="category-buttons-container">
              <CategoryButton
                type="button"
                isActive={activeCategory === "SPORTS"}
                onClick={() => this.setCategory("SPORTS")}
              >
                SPORTS
              </CategoryButton>
              <CategoryButton
                type="button"
                isActive={activeCategory === "TECHNICAL"}
                onClick={() => this.setCategory("TECHNICAL")}
              >
                TECHNICAL
              </CategoryButton>
              <CategoryButton
                type="button"
                isActive={activeCategory === "CULTURAL"}
                onClick={() => this.setCategory("CULTURAL")}
              >
                CULTURAL
              </CategoryButton>
            </div>
            <div className="events-list-container">
              {filteredEvents.map((eachEvent) => (
                <EventItem key={eachEvent.id} eventDetails={eachEvent} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Events;
