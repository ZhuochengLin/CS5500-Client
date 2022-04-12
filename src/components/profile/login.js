import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as errorServices from "../../services/error-services";
import {login} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedIn = useSelector(isLoggedIn);
    const loginButtonOnClick = () => {
        login(dispatch, loginUser)
            .then(() => navigate("/profile/mytuits"))
            .catch(e => errorServices.alertError(e));
    }
    const init = () => {
        if (loggedIn) {
            navigate("/home");
        }
    }
    useEffect(init, []);
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={loginButtonOnClick}
                    className="btn btn-primary mb-5">Login
            </button>
        </div>
    );
};