import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";
import {MY} from "../../services/utils";

const MyMedia = () => {
    const [mediaTuits, setMediaTuits] = useState([]);
    const findMyMediaTuits = () =>
        service.findTuitsWithMediaByUser(MY)
            .then(tuits => setMediaTuits(tuits));
    useEffect(findMyMediaTuits, []);
    return(
        <>
            {
                mediaTuits && <Tuits tuits={mediaTuits} refreshTuits={findMyMediaTuits}/>
            }
        </>
    );
};

export default MyMedia;
