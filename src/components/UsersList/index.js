import { Component } from "react";
import Cookies from "js-cookie";
import {v4 as uuidv4} from 'uuid'
import UserListItem from "../UserListItem";

class UsersList extends Component {
  state = {
    userList: [
      {
        id: "1",
        name: "rahul",
        rollNumber: "19bq1a0542",
        college: "vvit",
        year: "1",
        mobile: "1234",
      },
      {
        id: "2",
        name: "rahul",
        rollNumber: "19bq1a0542",
        college: "vvit",
        year: "1",
        mobile: "1234",
      },
      {
        id: "3",
        name: "rahul",
        rollNumber: "19bq1a0542",
        college: "vvit",
        year: "1",
        mobile: "1234",
      },
    ],
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
    console.log(jsonData)
    this.setState({
      userList: convertedData,
    })
  };
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
        <div>
          <p>Sort By: </p>
          <div>
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
          <div>
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
        <div>
          <p>Gender</p>
          <div>
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
          <div>
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
        <div>
          <p>Year</p>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
      <div>
        <div>{this.renderFilters()}</div>
        <div>
          <h1>Registerd Users</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>College Name</th>
                <th>Year</th>
                <th>Mobile</th>
                <th>Branch</th>
                <th>Gender</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((eachUser) => (
                <UserListItem key={eachUser.id} userDetails={eachUser} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UsersList;
