import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyMedia = () => {
    const [mediaTuits, setMediaTuits] = useState([]);
    const findMyMediaTuits = () =>
        service.findTuitsWithMediaByUser("my")
            .then(tuits => setMediaTuits(tuits));
    useEffect(findMyMediaTuits, []);
    return(
       
            <Tuits tuits={mediaTuits}
                   refreshTuits={findMyMediaTuits}/>
       

    );
};

export default MyMedia;
