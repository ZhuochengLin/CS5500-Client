import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

const Home = () => {
  const [tuits, setTuits] = useState([]);
  const [tuitText, setTuitText] = useState('');
  const [image, setImage] = useState({});
  const findTuits = () =>
      service.findAllTuits()
        .then(tuits => setTuits(tuits));
  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);

  const createTuit = () => {
    const tuit = new FormData();
    tuit.append('image', image);
    tuit.append('tuit', tuitText);
    console.log('tuit');
    console.log(tuit);
    console.log('image');
    console.log(image);
    console.log('tuitText');
    console.log(tuitText);

    return service.createTuit('my', tuit)
        .then(findTuits)
  }

  const uploadFileHandler = (event) =>{
    setImage(event.target.files[0]);
  }

  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        <div className="d-flex">
          <div className="p-2">
            <img className="ttr-width-50px rounded-circle"
                 src="../images/nasa-logo.jpg" alt=""/>
          </div>
          <div className="p-2 w-100">
            <textarea
                onChange={(e) =>
                    setTuitText(e.target.value)}
              placeholder="What's happening?"
              className="w-100 border-0"/>
            <div className="row">
              <div className="col-10 ttr-font-size-150pc text-primary">
                <i className="fas fa-portrait me-3"/>
                <i className="far fa-gif me-3"/>
                <i className="far fa-bar-chart me-3"/>
                <i className="far fa-face-smile me-3"/>
                <i className="far fa-calendar me-3"/>
                <i className="far fa-map-location me-3"/>
                <input type="file" onChange={uploadFileHandler}/>
              </div>
              <div className="col-2">
                <a onClick={createTuit}
                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                  Tuit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tuits tuits={tuits}
             refreshTuits={findTuits}/>
    </div>
  );
};
export default Home;