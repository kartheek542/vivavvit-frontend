import { Component } from "react";
import { Button } from "../styledComponents";
import { Link } from "react-router-dom";
import withRouter from "../withRouter";
import Cookies from "js-cookie";
import './index.css'

class Header extends Component {
  state = {
    isLoggedIn: false,
  }
  componentDidMount() {
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    if(vvitAccessToken === undefined) {
      this.setState({
        isLoggedIn: false,
      })
    } else {
      this.setState({
        isLoggedIn: true,
      })
    }
  }
  onClickLogin = () => {
    const { navigate } = this.props;
    navigate("/login");
  };

  onClickRegister = () => {
    const { navigate } = this.props;
    navigate("/register");
  };
  goToHome = () => {
    const {navigate} = this.props;
    navigate('/');
  }
  onClickLogout = () => {
     Cookies.remove('vvitAccessToken')
     this.setState({
      isLoggedIn: false,
     }, this.goToHome)
  };

  onClickEvents = () => {
    const { navigate } = this.props;
    navigate("/events");
  };

  render() {
    const { title, events } = this.props;
    const {isLoggedIn} = this.state;

    return (
      <div>
        <div className="header-container">
          <Link to="/" className="home-link">
            <img src="https://www.vvitguntur.com/images/logo.png" alt="vvit logo" />

          </Link>
          {isLoggedIn ? (
            <Button type="button" color="#dc3145" onClick={this.onClickLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button type="button" color="#dc3145" onClick={this.onClickLogin}>
                Login
              </Button>
              <Button type="button" color="#0070c1" onClick={this.onClickRegister}>
                Register
              </Button>
            </>
          )}
        </div>
        <div>
          <h1 className="main-title">{title}</h1>
        </div>
        {events && (
          <div className="events-button-container">
            <Button type="button" color="#28a745" onClick={this.onClickEvents}>
              Events
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
