import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

const Home = () => {
    const [tuits, setTuits] = useState([]);
    const [tuit, setTuit] = useState('');
    const findTuits = () =>
        service.findAllTuits()
            .then(tuits => setTuits(tuits));
    useEffect(() => {
        let isMounted = true;
        findTuits()
        return () => {
            isMounted = false;
        }
    }, []);
    const createTuit = () =>
        service.createTuit('my', {tuit})
            .then(findTuits)
    return (
        <div className={"row m-0 border-start border-end"}>
            <div className="col-12 fw-bold fs-2">Home Screen</div>
            <div className={"col-12"}>
                <div className={"row m-0 align-items-center"}>
                  <div className={"col-2"}>
                    Avatar
                  </div>
                  <div className="col-10">
                    <textarea
                        onChange={(e) =>
                            setTuit(e.target.value)}
                        placeholder="What's happening?"
                        className="w-100 border-0"/>
                    <div className="row align-items-center overflow-hidden m-0">
                      <div className="col-8 fs-4 text-primary">
                        <div className={"row justify-content-evenly"}>
                          <i className="col-3 fa-solid fa-image-portrait"/>
                          <i className="col-3 fa-solid fa-image"/>
                          <i className="col-3 fa-solid fa-camera"/>
                          <i className="col-3 fa-solid fa-face-smile"/>
                          {/*<i className="col fa-solid fa-calendar"/>*/}
                          {/*<i className="col fa-solid fa-map-location"/>*/}
                        </div>
                      </div>
                      <button onClick={createTuit} className={`col-4 btn btn-primary rounded-pill fw-bold`}>
                        Tuit
                      </button>
                    </div>
                  </div>
                </div>
            </div>
            <div className={"col-12 mt-3"}>
              <Tuits tuits={tuits}
                     refreshTuits={findTuits}/>
            </div>
        </div>
    );
};
export default Home;