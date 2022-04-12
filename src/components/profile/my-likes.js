import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";
import {MY} from "../../services/utils";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser(MY)
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);
    
    return(
        <div>
            <h2>My Likes</h2>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;