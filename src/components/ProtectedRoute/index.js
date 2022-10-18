import { Navigate, Route } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = props => {
    const vvitAccessToken = Cookies.get('vvitAccessToken')
    if(vvitAccessToken === undefined) {
        return <Navigate replace to="/login" />
    }
    return <Route {...props} />;
}

export default ProtectedRoute;