import { Component } from "react";
import Cookies from "js-cookie";
import {v4 as uuidv4} from 'uuid'
import UserListItem from "../UserListItem";
import {Button} from "../styledComponents"
import "./index.css"

class UsersList extends Component {
  state = {
    userList: [],
    sortBy: 'name',
    genders: ['M', 'F'],
    years: [1, 2, 3, 4],
  };
  componentDidMount() {
    this.fetchUsersData();
  }
  fetchUsersData = async () => {
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    const {genders, years, sortBy} = this.state;
    console.log(years);
    const url = `https://vivavvit.herokuapp.com/coordinator/reports/filter?order_by=${sortBy}`;
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${vvitAccessToken}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gender: genders,
        year: years,
      })
    }
    console.log(vvitAccessToken);
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const convertedData = jsonData.map(eachUser => ({
      id: uuidv4(),
      name: eachUser.name,
      rollNumber: eachUser.rollNo,
      college: eachUser.college,
      year: eachUser.year,
      gender: eachUser.gender,
      email: eachUser.email,
      branch: eachUser.branch,
      mobile: eachUser.mobile,
    }))
    this.setState({
      userList: convertedData,
    })
  };
  onClickDownload = async () => {
    const {genders, years, sortBy} = this.state;
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    const url = `https://vivavvit.herokuapp.com/coordinator/reports/download?order_by=${sortBy}`;
    // const url = `http://localhost:8080/coordinator/reports/download?order_by=${sortBy}`;
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${vvitAccessToken}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gender: genders,
        year: years,
      })
    }
    await fetch(url, options);
    const dl = document.createElement('a');
    dl.href = "https://vivavvit.herokuapp.com/coordinator/reports/registeredfile";
    dl.target = "_blank";
    dl.click();

  }
  onChangeGender = event => {
    if(event.target.checked) {
      this.setState(prevState => ({
        genders: [...prevState.genders, event.target.value]
      }), this.fetchUsersData)
    } else {
      this.setState((prevState) => ({
        genders: prevState.genders.filter(
          (eachGender) => eachGender !== event.target.value
        ),
      }), this.fetchUsersData);
    }
  }
  onChangeYear = event => {
    console.log(event.target.checked)
    if(event.target.checked) {
      this.setState(prevState => ({
        years: [...prevState.years, parseInt(event.target.value)]
      }), this.fetchUsersData)
    } else {
      this.setState((prevState) => ({
        years: prevState.years.filter(
          (eachYear) => eachYear!== parseInt(event.target.value)
        ),
      }), this.fetchUsersData);
    }
  }
  onChangeSortBy = (event) => {
    this.setState({
      sortBy: event.target.value,
    }, this.fetchUsersData)
  }
  renderFilters = () => {
    const {sortBy, genders, years} = this.state;
    const male = genders[0] === 'M' || genders[1] === 'M';
    const female = genders[0] === 'F' || genders[1] === 'F';
    // console.log(years)
    return (
      <>
        <h1>Filters</h1>
        <p className="filter-heading">Sort By: </p>
        <div className="filter-items-container">
          <div className="filter-item">
            <input
              type="radio"
              name="sort"
              id="sortByName"
              checked={sortBy === "name"}
              value="name"
              onChange={this.onChangeSortBy}
            />
            <label htmlFor="sortByName">Name</label>
          </div>
          <div className="filter-item">
            <input
              type="radio"
              name="sort"
              id="sortByRoll"
              checked={sortBy === "rollno"}
              value="rollno"
              onChange={this.onChangeSortBy}
            />
            <label htmlFor="sortByRoll">Roll</label>
          </div>
        </div>
        <p className="filter-heading">Gender</p>
        <div className="filter-items-container">
          <div className="filter-item">
            <input
              type="checkbox"
              checked={male}
              value="M"
              id="male"
              name="gender"
              onChange={this.onChangeGender}
            />
            <label htmlFor="male">male</label>
          </div>
          <div className="filter-item">
            <input
              type="checkbox"
              checked={female}
              value="F"
              id="female"
              name="gender"
              onChange={this.onChangeGender}
            />
            <label htmlFor="female">female</label>
          </div>
        </div>
        <p className="filter-heading">Year</p>
        <div className="filter-items-container">
          <div className="filter-item">
            <input
              type="checkbox"
              checked={years.includes(1)}
              value={1}
              id="year1"
              name="year"
              onChange={this.onChangeYear}
            />
            <label htmlFor="year1">1</label>
          </div>
          <div className="filter-item">
            <input
              type="checkbox"
              checked={years.includes(2)}
              value={2}
              id="year2"
              name="year"
              onChange={this.onChangeYear}
            />
            <label htmlFor="year2">2</label>
          </div>
          <div className="filter-item">
            <input
              type="checkbox"
              checked={years.includes(3)}
              value={3}
              id="year3"
              name="year"
              onChange={this.onChangeYear}
            />
            <label htmlFor="year1">3</label>
          </div>
          <div className="filter-item">
            <input
              type="checkbox"
              checked={years.includes(4)}
              value={4}
              id="year4"
              name="year"
              onChange={this.onChangeYear}
            />
            <label htmlFor="year1">4</label>
          </div>
        </div>
      </>
    );
  };
  render() {
    const { userList } = this.state;
    return (
      <div className="user-details-container">
        <div className="filters-container">{this.renderFilters()}</div>
        <div className="user-list-container">
          <h1 className="registered-users-heading">Registered Users</h1>
          <div className="user-items-container">
            <div className="user-row head-row">
              <tr className="col col-1 col-head">Name</tr>
              <tr className="col col-2 col-head">Roll Number</tr>
              <tr className="col col-3 col-head">College Name</tr>
              <tr className="col col-4 col-head">Year</tr>
              <tr className="col col-5 col-head">Mobile</tr>
              <tr className="col col-6 col-head">Branch</tr>
              <tr className="col col-7 col-head">Gender</tr>
              <tr className="col col-8 col-head">Email</tr>
            </div>
          </div>
          <div className="user-items-container user-details-table">
            {userList.map((eachUser) => (
              <UserListItem key={eachUser.id} userDetails={eachUser} />
            ))}
          </div>
          <div className="download-button-container">
            <Button
              type="button"
              color="#0070c1"
              onClick={this.onClickDownload}
              as="a"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
