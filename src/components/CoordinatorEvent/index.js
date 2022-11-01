import { Component } from "react";
import Header from "../Header";
import UsersList from "../UsersList";
import Cookies from "js-cookie";
import withRouter from "../withRouter";
import {Button} from "../styledComponents"
import { Navigate } from "react-router-dom";
import "./index.css"

class CoordinatorEvent extends Component {
  state = {
    eventId: "",
    eventName: "Event",
  };
  componentDidMount() {
    this.fetchEventDetails();
  }
  fetchEventDetails = async () => {
    const vvitAccessToken = Cookies.get("vvitAccessToken");
    const url = "https://vivavvit.herokuapp.com/coordinator";
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${vvitAccessToken}`,
      },
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const { eventId, eventName } = jsonData;
    this.setState({
      eventId,
      eventName,
    });
  };
  onClickEdit = () => {
    const { navigate } = this.props;
    navigate(`/coordinator/edit`);
  };
  render() {
    const { eventId, eventName } = this.state;
    const vvitAccessToken = Cookies.get("vvitAccessToken");
    return vvitAccessToken === undefined ? (
      <Navigate replace to="/login" />
    ) : (
      <div className="coordinator-event-page full-page">
        <Header title={eventName} />
        <div className="edit-button-container">
          <Button type="button" color="#0070c1" onClick={this.onClickEdit}>
            Edit event details
          </Button>
        </div>
        <UsersList eventId={eventId} />
      </div>
    );
  }
}

export default withRouter(CoordinatorEvent);
