import React from "react";
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
import * as errorServices from "../../services/error-services";

const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => errorServices.alertError(e));

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits)
            .catch(e => errorServices.alertError(e));
    return (
        <>
            {
                tuits.map && tuits.map(tuit =>
                    <Tuit key={tuit._id}
                          deleteTuit={deleteTuit}
                          likeTuit={likeTuit}
                          tuit={tuit}/>)
            }
        </>
      );
}

export default Tuits;