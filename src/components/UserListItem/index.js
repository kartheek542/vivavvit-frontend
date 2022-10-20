import "./index.css"

const UserListItem = props => {
    const {userDetails} = props
    const {name, rollNumber, college, mobile, year, branch, gender, email} = userDetails;
    return (
        <tr>
            <td>{name}</td>
            <td>{rollNumber}</td>
            <td>{college}</td>
            <td>{year}</td>
            <td>{mobile}</td>
            <td>{branch}</td>
            <td>{gender === 'M' ? 'Male' : 'Female'}</td>
            <td>{email}</td>
        </tr>
    )
}

export default UserListItem;