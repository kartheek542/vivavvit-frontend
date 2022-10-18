import "./index.css"

const UserListItem = props => {
    const {userDetails} = props
    const {name, rollNumber, college, mobile, year} = userDetails;
    return (
        <tr>
            <td>{name}</td>
            <td>{rollNumber}</td>
            <td>{college}</td>
            <td>{year}</td>
            <td>{mobile}</td>
        </tr>
    )
}

export default UserListItem;