import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {MY} from "../../services/constants";
import * as errorServices from "../../services/error-services";
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import CreateTuit from "../CreateTuit";

const Home = () => {
    const loggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const [tuits, setTuits] = useState([]);
    const findTuits = () => {
        service.findAllTuits()
            .then(tuits => setTuits(tuits))
            .catch(e => errorServices.alertError(e));
    }
    const init = () => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        findTuits();
    };
    useEffect(init, []);
    return (
        <div className={"row m-0 border border-top-0"}>
            <h1 className="col-12 fw-bold fs-2 p-4">Home Screen</h1>
            {loggedIn && <CreateTuit/>}
            <div className={"col-12 p-0"}>
                <Tuits tuits={tuits}
                       refreshTuits={init}/>
            </div>
        </div>
    );
};
export default Home;