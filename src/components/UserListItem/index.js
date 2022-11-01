import "./index.css"

const UserListItem = props => {
    const {userDetails} = props
    const {name, rollNumber, college, mobile, year, branch, gender, email} = userDetails;
    return (
        <div className="user-row">
            <div className="col col-1">{name}</div>
            <div className="col col-2">{rollNumber}</div>
            <div className="col col-3">{college}</div>
            <div className="col col-4">{year}</div>
            <div className="col col-5">{mobile}</div>
            <div className="col col-6">{branch}</div>
            <div className="col col-7">{gender === 'M' ? 'Male' : 'Female'}</div>
            <div className="col col-8">{email}</div>
        </div>
    )
}

export default UserListItem;