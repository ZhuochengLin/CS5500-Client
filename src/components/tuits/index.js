import React from "react";
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";

const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

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