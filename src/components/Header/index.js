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
  
  onClickSponsors = () => {
    const {navigate} = this.props;
    navigate('/sponsors')
  }

  onClickGallery = () => {
    const {navigate} = this.props;
    navigate('/gallery')
  }

  onClickEvents = () => {
    const { navigate } = this.props;
    navigate("/events");
  };

  render() {
    const { title } = this.props;
    const {isLoggedIn} = this.state;

    return (
      <div>
        <div className="header-container">
          <div className="logo-container">
            <Link to="/" className="home-link">
              <img
                src="https://raw.githubusercontent.com/kamal-tej/proj_images/main/viva.png"
                alt="viva logo"
                className="logo"
              />
              <img
                src="https://www.vvitguntur.com/images/logo.png"
                alt="vvit logo"
                className="logo"
              />
            </Link>
          </div>
          {isLoggedIn ? (
            <Button type="button" color="#dc3145" onClick={this.onClickLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                type="button"
                color="#0e868a"
                onClick={this.onClickSponsors}
              >
                Sponsors
              </Button>
              <Button
                type="button"
                color="#990fa6"
                onClick={this.onClickGallery}
              >
                Gallery
              </Button>
              <Button
                type="button"
                color="#28a745"
                onClick={this.onClickEvents}
              >
                Events
              </Button>
              <Button type="button" color="#dc3145" onClick={this.onClickLogin}>
                Login
              </Button>
              <Button
                type="button"
                color="#0070c1"
                onClick={this.onClickRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>
        <div>
          <h1 className="main-title">{title}</h1>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
