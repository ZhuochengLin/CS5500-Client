import React from "react";
import TuitStats from "./tuit-stats";
import TuitImages from "./tuit-images";
import TuitVideo from "./tuit-video";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";

const Tuit = ({tuit, deleteTuit, likeTuit}) => {
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis / 1000.0;
        const minutesOld = secondsOld / 60.0;
        const hoursOld = minutesOld / 60.0;
        const daysOld = hoursOld / 24.0;
        if (daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if (hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if (minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if (secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        }
        return old;
    }
    const navigate = useNavigate();
    const loggedInUserId = useSelector(getUserId);
    const isMyTuit = tuit ? loggedInUserId === tuit.postedBy._id : false;
    const goToTuitDetails = () => {
        navigate(`/tuit/${tuit._id}`)
    }
    const goToTuitEdit = (e) => {
        e.stopPropagation();
        navigate(`/tuit/${tuit._id}/edit`)
    }
    const deleteTuitHandler = (e, tid) => {
        e.stopPropagation();
        deleteTuit(tid);
    }
    return (
            <div className={"list-group-item list-group-item-action border-0 border-bottom"} onClick={goToTuitDetails}>
                <div className={"row m-0 pt-3 pb-3"}>
                    <div className="col-2 pt-2">
                        Avatar
                    </div>
                    <div className={"col-10"}>
                        <div className={"col-12"}>
                            <div className={"row m-0 align-items-center"}>
                                <div
                                    className="col-8 col-lg-10 fs-5 ps-2">
                                    {tuit.postedBy && tuit.postedBy.username}
                                    @{tuit.postedBy && tuit.postedBy.username} -
                                    <span> {daysOld(tuit)}</span>
                                </div>
                                {
                                    isMyTuit &&
                                    <>

                                        <i className="col-2 col-lg-1 fas fa-ellipsis" onClick={(e) => goToTuitEdit(e)} role={"button"}/>
                                        <i title={"Delete"} className="col-2 col-lg-1 fa-solid fa-xmark" role={"button"}
                                           onClick={(e) => deleteTuitHandler(e, tuit._id)}/>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={"col-12 ps-2"} onClick={goToTuitDetails}>
                            {tuit.tuit}
                        </div>

                        <div className={"col-12 pt-2"}>
                            <div className={"row"}>
                            {
                                (tuit.video.length !== 0) &&
                                <TuitVideo tuit={tuit}/>
                            }
                            {
                                (tuit.image.length !== 0) &&
                                <TuitImages tuit={tuit}/>
                            }
                            </div>
                        </div>
                        <div className={"col-12 pt-2"}>
                            <TuitStats tuit={tuit} likeTuit={likeTuit}/>
                        </div>
                    </div>
                </div>
            </div>
    )
};
export default Tuit;