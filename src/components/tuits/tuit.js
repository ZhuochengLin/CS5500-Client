import React from "react";
import TuitStats from "./tuit-stats";
import TuitImages from "./tuit-images";
import TuitVideo from "./tuit-video";
import {Link} from "react-router-dom";

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
    return (
            <div className={"row m-0 border-top pt-3 pb-3"}>
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
                            <Link className={"col-2 col-lg-1"} to={`/tuit/${tuit._id}`}>
                                <i className="fas fa-ellipsis"/>
                            </Link>
                            <i className="col-2 col-lg-1 fa-solid fa-xmark" onClick={() => deleteTuit(tuit._id)}/>
                        </div>
                    </div>
                    <div className={"col-12 ps-2"}>
                        {tuit.tuit}
                    </div>

                    <div className={"col-12 mt-2 mb-2"}>
                        {
                            (tuit.video.length !== 0) &&
                            <div className={"row m-0"}>
                                <TuitVideo tuit={tuit}/>
                            </div>
                        }
                        {
                            (tuit.image.length !== 0) &&
                            <TuitImages tuit={tuit}/>
                        }
                    </div>
                    <div className={"col-12"}>
                        <TuitStats tuit={tuit} likeTuit={likeTuit}/>
                    </div>
                </div>
            </div>
    )
};
export default Tuit;