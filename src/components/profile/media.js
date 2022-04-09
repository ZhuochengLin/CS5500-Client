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
        <>
            <h1>Tuits with media should be displayed below</h1>
            <Tuits tuits={mediaTuits}
                   refreshTuits={findMyMediaTuits}/>
        </>

    );
};

export default MyMedia;