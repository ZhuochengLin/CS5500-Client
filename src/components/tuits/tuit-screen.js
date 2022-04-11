import React, {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {useParams, Link, useNavigate} from "react-router-dom";
import * as errorServices from "../../services/error-services";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import TuitVideo from "./tuit-video";
import TuitImages from "./tuit-images";
import TuitStats from "./tuit-stats";

const TuitScreen = () => {
    const [tuit, setTuit] = useState();
    const {tid} = useParams();
    const findTuitById = () => {
        service.findTuitById(tid)
            .then(t => {
                setTuit(t)
            }).catch(e => errorServices.alertError(e));
    }
    useEffect(findTuitById, []);
    const loggedInUserId = useSelector(getUserId);
    const isMyTuit = tuit ? loggedInUserId === tuit.postedBy._id : false;
    const navigate = useNavigate();
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then((status) => navigate("/home"))
            .catch(e => errorServices.alertError(e));
    const goToTuitEdit = () => {
        navigate(`/tuit/${tuit._id}/edit`)
    }
    return(
        <div className={"row m-0 border-start border-end pt-3"}>
            <div className={"col-12"}>
                <div className={"row m-0 align-items-center justify-content-start"}>
                    <Link to={"/home"} className={"col-1 text-decoration-none text-black"}>
                        <i className={"fa-solid fa-arrow-left"}/>
                    </Link>
                    <span className={"col-1 fs-2 fw-bold"}>
                        Tuit
                    </span>
                    <div className={"col-8"}/>
                    {
                        isMyTuit &&
                        <>
                            <i className="col-1 col-lg-1 fas fa-ellipsis" onClick={goToTuitEdit} role={"button"}/>
                            <i title={"Delete"} className="col-1 col-lg-1 fa-solid fa-xmark" role={"button"} onClick={() => deleteTuit(tuit._id)}/>
                        </>
                    }
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row m-0 mt-4 align-items-center"}>
                    <div className={"col-2"}>
                        Avatar
                    </div>
                </div>
            </div>
            <div className={"col-12 p-4 pb-0"}>
                {tuit && tuit.tuit}
            </div>
            <div className={"col-12 p-4 pb-0"}>
                {
                    tuit && (tuit.video.length !== 0) &&
                    <div className={"row m-0"}>
                        <TuitVideo tuit={tuit}/>
                    </div>
                }
                {
                    tuit && (tuit.image.length !== 0) &&
                    <TuitImages tuit={tuit}/>
                }
            </div>
            <div className={"col-12 p-4"}>
                {tuit && <TuitStats tuit={tuit}/>}
            </div>
        </div>
    )
};
export default TuitScreen;