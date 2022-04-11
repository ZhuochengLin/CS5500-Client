import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";
import {MY} from "../../services/constants";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser(MY)
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    return(
        <>
            {tuits &&
                <Tuits tuits={tuits} refreshTuits={findMyTuits}/>}
        </>
    );
};

export default MyTuits;