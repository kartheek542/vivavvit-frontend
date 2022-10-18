import { Component } from "react";
import Header from "../Header";
import UsersList from "../UsersList";
import Cookies from "js-cookie";
import withRouter from "../withRouter";
import { Navigate } from "react-router-dom";

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
      <div>
        <Header title={eventName} />
        <div>
          <button type="button" onClick={this.onClickEdit}>
            Edit event details
          </button>
        </div>
        <UsersList eventId={eventId} />
      </div>
    );
  }
}

export default withRouter(CoordinatorEvent);
