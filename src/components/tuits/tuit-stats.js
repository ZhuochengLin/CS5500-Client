import React, { useState, useEffect } from "react";
import * as likeService from "../../services/likes-service";
import { MY } from "../../services/utils";
import * as errorServices from "../../services/error-services";

const TuitStats = ({ tuit, likeTuit = () => { } }) => {
    const [hasLiked, setHasLike] = useState(false);

    const updateLike = () => {
        likeService.userAlreadyLikedTuit(MY, tuit._id).
            then((liked) => {
                setHasLike(!!liked);
            }).catch(e => errorServices.alertError(e));
    };

    useEffect(() => { updateLike() }, [tuit]);

    const likeTuitHandler = (e, tuit) => {
        e.stopPropagation();
        likeTuit(tuit);
    }

    return (
        <div className="row m-0 mt-2">

            <div className="col">
                <div className={"row align-items-center"}>
                    <span>
                        <i className="col fa-regular fa-message pe-0" />
                        {
                            tuit.stats &&
                            <span className={"col ps-0"}>{tuit.stats.replies}</span>
                        }
                    </span>
                </div>
            </div>

            <div className="col">
                <div className={"row align-items-center"}>
                    <span>
                        <i className="col fa-solid fa-retweet pe-0" />
                        {tuit.stats &&
                            <span className="col ps-0">{tuit.stats.retuits}</span>
                        }
                    </span>
                </div>
            </div>

            <div className="col">
                <div className={"row align-items-center"}>
                    <span onClick={(e) => likeTuitHandler(e, tuit)}>
                        {
                            hasLiked &&
                            <i className="col fa-solid fa-heart pe-0" style={{ color: 'red' }}></i>
                        }
                        {
                            !hasLiked &&
                            <i className="col fa-regular fa-heart pe-0"></i>
                        }
                        {tuit.stats && tuit.stats.likes}
                    </span>
                </div>
            </div>

            <div className="col-2">
                <i className="fa-solid fa-share-from-square" />
            </div>

        </div >
    );
}
export default TuitStats;