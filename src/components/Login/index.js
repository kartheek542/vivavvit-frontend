import { Component } from "react";
import Header from '../Header'
import Cookies from 'js-cookie';
import withRouter from "../withRouter";
import "./index.css";
import { Link, Navigate } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    formErrorMsg: '',
  };
  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  onBlurUsername = () => {
    const { username } = this.state;
    if (username === "") {
      this.setState({
        usernameError: "Required",
      });
    } else if (username.length !== 10) {
      this.setState({
        usernameError: "Invalid Roll number",
      });
    } else {
      this.setState({
        usernameError: "",
      });
      return true;
    }
    return false;
  };
  onBlurPassword = () => {
    const { password } = this.state;
    if (password === "") {
      this.setState({
        passwordError: "Required",
      });
    } else {
      this.setState({
        passwordError: "",
      });
      return true;
    }
    return false;
  };
  onLoginSuccess = (vvitAccessToken) => {
    console.log("navigating")
    Cookies.set('vvitAccessToken', vvitAccessToken)
    const {navigate} = this.props;
    navigate('/coordinator')
  }
  submitData = async () => {
    console.log("successfully submitted");
    const {username, password} = this.state;
    const url = "https://vivavvit.herokuapp.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    console.log(jsonData)
    const {vvitAccessToken, errorMsg} = jsonData;
    if(vvitAccessToken === undefined) {
      this.setState({
        formErrorMsg: errorMsg
      })
    } else {
      this.onLoginSuccess(vvitAccessToken);
    }
  };
  onSubmitForm = (event) => {
    event.preventDefault();
    let stat = this.onBlurUsername();
    stat = stat && this.onBlurPassword();
    if (stat) {
      this.submitData();
    } else {
      console.log("login failed");
    }
  };
  render() {
    const { username, password, usernameError, passwordError, formErrorMsg} = this.state;
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    return vvitAccessToken !== undefined ? (
      <Navigate replace to="/coordinator" />
    ) : (
      <div className="login-page">
        <Header />
        <div className="login-form-container">
          <form onSubmit={this.onSubmitForm} className="login-form">
            <h1>Login As Coordinator</h1>
            <div className="login-input-container">
              <label htmlFor="rollNumber" className="login-input-label">ROLL NUMBER</label>
              <input
                id="rollNumber"
                type="text"
                placeholder="Enter your Roll number"
                value={username}
                onChange={this.onChangeUsername}
                onBlur={this.onBlurUsername}
                className="login-input"
              />
              <p className="error-msg">{usernameError}</p>
            </div>
            <div className="login-input-container">
              <label htmlFor="password" className="login-input-label">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.onChangePassword}
                onBlur={this.onBlurPassword}
                className="login-input"
              />
              <p className="error-msg">{passwordError}</p>
            </div>
            <p className="error-msg">{formErrorMsg}</p>
            <div className="login-button-container">
              <button type="submit" className="login-button">Login</button>
            </div>
            <Link to="/register" className="login-register-link">Not a coordinator, Register here</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
