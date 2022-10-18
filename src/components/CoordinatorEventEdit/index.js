import Cookies from "js-cookie";
import { Component } from "react";
import { Navigate } from "react-router-dom";
import Header from "../Header";

class CoordinatorEventEdit extends Component {
  state = {
    eventName: "",
    eventVenue: "",
    eventTime: "",
    eventDescription: '',
    eventDate: "",
    venueError: "",
    dateError: "",
    timeError: "",
    descError: '',
  };
  componentDidMount() {
    this.fetchEventDetails();
  }
  fetchEventDetails = async () => {
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    const url = 'https://vivavvit.herokuapp.com/coordinator';
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${vvitAccessToken}`
      }
    }
    const response = await fetch(url, options);
    const jsonData = await response.json();
    this.setState({
      eventDate: jsonData.date,
      eventVenue: jsonData.venue,
      eventDescription: jsonData.description,
      eventTime: jsonData.time,
    })
  }
  saveEventDetails = async () => {
    const {eventVenue, eventDate, eventTime, eventDescription} = this.state;
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    const url = 'https://vivavvit.herokuapp.com/coordinator/save'
    const options = {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${vvitAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        venue: eventVenue,
        date: eventDate,
        time: eventTime,
        description: eventDescription.replaceAll("'", "''"),
      })
    }
    const response = await fetch(url, options);
    const jsonData = await response.json();
    console.log(jsonData);
  }
  onChangeVenue = (event) => {
    this.setState({
      eventVenue: event.target.value,
    });
  };
  onChangeDate = (event) => {
    this.setState({
      eventDate: event.target.value,
    });
  };
  onChangeTime = (event) => {
    this.setState({
      eventTime: event.target.value,
    });
  };
  onBlurVenue = () => {
    const {eventVenue} = this.state;
    if(eventVenue === '') {
        this.setState({
            venueError: 'Required',
        })
    } else {
        this.setState({
            venueError: ''
        })
        return true
    }
    return false;
  }
  onBlurDate = () => {
    const {eventDate} = this.state;
    if(eventDate === '') {
        this.setState({
            dateError: 'Required',
        })
    } else {
        this.setState({
            dateError: ''
        })
        return true
    }
    return false;
  }
  onBlurTime = () => {
    const {eventTime} = this.state;
    if(eventTime === '') {
        this.setState({
            timeError: 'Required',
        })
    } else {
        this.setState({
            timeError: ''
        })
        return true
    }
    return false;
  }
  onSubmitForm = (event) => {
    event.preventDefault();
    let res = this.onBlurVenue();
    res = res && this.onBlurDate();
    res = res && this.onBlurTime();
    res = res && this.onBlurDescription();
    if(res) {
        console.log('data saved')
        this.saveEventDetails();
    }
  }
  onChangeDescription = (event) => {
    this.setState({
      eventDescription: event.target.value,
    })
  }
  onBlurDescription = () => {
    const {eventDescription} = this.state;
    if(eventDescription === '') {
      this.setState({
        descError: 'Required',
      })
    } else {
      this.setState({
        descError: '',
      })
      return true;
    }
    return false;
  }
  render() {
    const {
      eventName,
      eventVenue,
      eventTime,
      eventDate,
      venueError,
      timeError,
      dateError,
      eventDescription,
      descError
    } = this.state;
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    return vvitAccessToken === undefined ? (
      <Navigate replace to="/login" />
    ) : (
      <div>
        <Header title={eventName} />
        <div>
          <form onSubmit={this.onSubmitForm}>
            <h1>Edit Event details here</h1>
            <div>
              <label htmlFor="venue">Event Venue</label>
              <input
                type="text"
                value={eventVenue}
                placeholder="Enter event name"
                id="venue"
                onChange={this.onChangeVenue}
                onBlur={this.onBlurVenue}
              />
              <p>{venueError}</p>
            </div>
            <div>
              <label htmlFor="date">Event Date</label>
              <input
                type="text"
                value={eventDate}
                placeholder="Enter event date"
                id="date"
                onChange={this.onChangeDate}
                onBlur={this.onBlurDate}
              />
              <p>{dateError}</p>
            </div>
            <div>
              <label htmlFor="time">Event Time</label>
              <input
                type="text"
                value={eventTime}
                placeholder="Enter event name"
                id="time"
                onChange={this.onChangeTime}
                onBlur={this.onBlurTime}
              />
              <p>{timeError}</p>
            </div>
            <div>
              <label htmlFor="desc">Event Description</label>
              <textarea
                id="desc"
                value={eventDescription}
                onChange={this.onChangeDescription}
                onBlur={this.onBlurDescription}
              />
              <p>{descError}</p>
            </div>
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CoordinatorEventEdit;
