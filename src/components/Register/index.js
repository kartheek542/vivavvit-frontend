import { Component } from "react";
import EventCheckboxItem from "../EventCheckboxItem";
import SubmitSuccess from "../SubmitSuccess";
import "./index.css";

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
        selected: false,
      });
    }
  });
  return totalEvents;
};

class Register extends Component {
  state = {
    name: "",
    rollNumber: "",
    email: "",
    branch: 'CSE',
    mobileNumber: "",
    nameError: "",
    rollError: "",
    emailError: "",
    mobileError: "",
    formError: "",
    totalEvents: generateEvents(30),
    currentEventType: "SPORTS",
    year: '1',
    college: 'VVIT',
    gender: 'M',
    submitted: false,
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const url = "https://vivavvit.herokuapp.com/events"
    const response = await fetch(url);
    const jsonData = await response.json();
    const convertedData = jsonData.map(eachItem => ({
      id: eachItem.eventId,
      eventName: eachItem.eventName,
      eventCategory: eachItem.category.toUpperCase(),
      selected: false,
    }))
    this.setState({
      totalEvents: convertedData,
    })
  }
  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  onChangeRollNumber = (event) => {
    this.setState({
      rollNumber: event.target.value,
    });
  };
  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  onChangeMobile = (event) => {
    this.setState({
      mobileNumber: event.target.value,
    });
  };
  onBlurRoll = () => {
    const { rollNumber } = this.state;
    if (rollNumber === "") {
      this.setState({
        rollError: "Required",
      });
    } else if (rollNumber.length !== 10) {
      this.setState({
        rollError: "Invalid Roll Number",
      });
    } else {
      this.setState({
        rollError: "",
      });
      return true;
    }
    return false;
  };
  onBlurMobile = () => {
    const { mobileNumber } = this.state;
    if (mobileNumber === "") {
      this.setState({
        mobileError: "Required",
      });
    } else if (mobileNumber.length !== 10) {
      this.setState({
        mobileError: "Invalid Mobile Number",
      });
    } else {
      this.setState({
        mobileError: "",
      });
      return true;
    }
    return false;
  };
  onBlurEmail = () => {
    const { email } = this.state;
    if (email === "") {
      this.setState({
        emailError: "Required",
      });
    } else {
      this.setState({
        emailError: "",
      });
      return true;
    }
    return false;
  };
  onBlurName = () => {
    const { name } = this.state;
    if (name === "") {
      this.setState({
        nameError: "Required",
      });
    } else {
      this.setState({
        nameError: "",
      });
      return true;
    }
    return false;
  };
  setCategory = (category) => {
    this.setState({
      currentEventType: category,
    });
  };
  checkedEvent = (eid, status) => {
    this.setState((prevState) => ({
      totalEvents: prevState.totalEvents.map((eachEvent) => {
        if (eachEvent.id === eid) {
          return {
            ...eachEvent,
            selected: status,
          };
        }
        return eachEvent;
      }),
    }));
  };
  onChangeYear = (event) => {
    this.setState({
      year: event.target.value,
    })
  }
  submitData = async () => {
    const {
      totalEvents,
      name,
      rollNumber,
      mobileNumber,
      email,
      year,
      college,
      gender,
      branch,
    } = this.state;
    const registerdEvents = totalEvents.filter(eachEvent => eachEvent.selected).map(eachEvent => eachEvent.id);
    const url = "https://vivavvit.herokuapp.com/register";
    const options = {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        name,
        rollNo: rollNumber,
        college,
        branch,
        year,
        email,
        mobile: mobileNumber,
        gender,
        events: registerdEvents,
      }),
    }
    await fetch(url, options)
    this.setState({
      submitted: true,
    })
  }
  onSubmitForm = (event) => {
    event.preventDefault();
    const { totalEvents } = this.state;
    let stat = this.onBlurName();
    stat = stat && this.onBlurRoll();
    stat = stat && this.onBlurEmail();
    stat = stat && this.onBlurMobile();
    const registerdEvents = totalEvents.filter(
      (eachEvent) => eachEvent.selected
    );
    if (stat && registerdEvents.length > 0) {
      this.setState({
        formError: "",
      });
      this.submitData();
    } else if (registerdEvents.length === 0 && stat) {
      console.log(stat);
      this.setState({
        formError: "Please select atleast one event",
      });
    }
  };
  render() {
    const {
      name,
      rollNumber,
      email,
      mobileNumber,
      nameError,
      mobileError,
      rollError,
      emailError,
      currentEventType,
      totalEvents,
      formError,
      year,
      submitted,
    } = this.state;
    const filterdEvents = totalEvents.filter(
      (eachEvent) => eachEvent.eventCategory === currentEventType
    );
    return (submitted) ? (
      <SubmitSuccess />
    ) : (
      <div>
        <div>
          <h1>Register for VIVAVVIT</h1>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div>
            <div>
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={this.onChangeName}
                onBlur={this.onBlurName}
              />
              <p>{nameError}</p>
            </div>
            <div>
              <label htmlFor="rollNumber">ROLL NUMBER</label>
              <input
                type="text"
                id="rollNumber"
                placeholder="Enter your 10 digit roll number"
                value={rollNumber}
                onChange={this.onChangeRollNumber}
                onBlur={this.onBlurRoll}
              />
              <p>{rollError}</p>
            </div>
            <div>
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email id"
                value={email}
                onChange={this.onChangeEmail}
                onBlur={this.onBlurEmail}
              />
              <p>{emailError}</p>
            </div>
            <div>
              <label htmlFor="mobile">MOBILE</label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={this.onChangeMobile}
                onBlur={this.onBlurMobile}
              />
              <p>{mobileError}</p>
            </div>
            <div>
              <p>Year</p>
              <div>
                <label htmlFor="year1">1</label>
                <input
                  id="year1"
                  type="radio"
                  checked={year === "1"}
                  name="year"
                  value="1"
                  onChange={this.onChangeYear}
                />
              </div>
              <div>
                <label htmlFor="year2">2</label>
                <input
                  id="year2"
                  type="radio"
                  checked={year === "2"}
                  name="year"
                  value="2"
                  onChange={this.onChangeYear}
                />
              </div>
              <div>
                <label htmlFor="year3">3</label>
                <input
                  id="year3"
                  type="radio"
                  checked={year === "3"}
                  name="year"
                  value="3"
                  onChange={this.onChangeYear}
                />
              </div>
              <div>
                <label htmlFor="year4">4</label>
                <input
                  id="year4"
                  type="radio"
                  checked={year === "4"}
                  name="year"
                  value="4"
                  onChange={this.onChangeYear}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <button type="button" onClick={() => this.setCategory("SPORTS")}>
                SPORTS
              </button>
              <button
                type="button"
                onClick={() => this.setCategory("TECHNICAL")}
              >
                TECHNICAL
              </button>
              <button
                type="button"
                onClick={() => this.setCategory("CULTURAL")}
              >
                CULTURAL
              </button>
            </div>
            <div>
              {filterdEvents.map((eachEvent) => (
                <EventCheckboxItem
                  key={eachEvent.id}
                  eventDetails={eachEvent}
                  onChangeEvent={this.checkedEvent}
                />
              ))}
            </div>
          </div>
          <p>{formError}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
