import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import { useEffect, useState } from "react";
import * as errorServices from "../../services/error-services";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/selectors";
import { useNavigate } from "react-router-dom";
import CreateTuit from "../CreateTuit";
import { refresh } from "../../redux/actions";

const Home = () => {
    const loggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const [tuits, setTuits] = useState([]);
    const findTuits = () => {
        service.findAllTuits()
            .then(tuits => setTuits(tuits))
            .catch(e => errorServices.alertError(e));
    }
    const dispatch = useDispatch();
    const init = async () => {
        await refresh(dispatch);
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        findTuits();
    };
    useEffect(() => { init(); }, findTuits(), []);
    return (
        <>
            {
                loggedIn &&
                <div className={"row m-0 border border-top-0"}>
                    <h1 className="col-12 fw-bold fs-2 p-4">Home Screen</h1>
                    <CreateTuit />
                    <div className={"col-12 p-0 border-top"}>
                        {
                            tuits &&
                            <Tuits tuits={tuits}
                                refreshTuits={init, findTuits} />
                        }
                    </div>
                </div>}
        </>
    );
};
export default Home;