import {useState} from "react";
import * as service from "../../services/security-service";
import {useNavigate} from "react-router-dom";
import * as errorServices from "../../services/error-services";
import {register} from "../../redux/actions";
import {useDispatch} from "react-redux";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signupButtonOnClick = () => {
        register(dispatch, newUser)
            .then(() => navigate("/profile/mytuits"))
            .catch(e => errorServices.alertError(e));
    }
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={signupButtonOnClick}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}
export default Signup;