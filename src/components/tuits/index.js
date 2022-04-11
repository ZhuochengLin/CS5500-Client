import React from "react";
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
import * as errorServices from "../../services/error-services";
import {MY} from "../../services/constants";

const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService.userLikesTuit(MY, tuit._id)
            .then(refreshTuits)
            .catch(e => errorServices.alertError(e));

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits)
            .catch(e => errorServices.alertError(e));
    return (
        <div className={"list-group"}>
            {
                tuits.map && tuits.map(tuit =>
                    <Tuit key={tuit._id}
                          deleteTuit={deleteTuit}
                          likeTuit={likeTuit}
                          tuit={tuit}/>)
            }
        </div>
      );
}

export default Tuits;