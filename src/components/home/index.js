import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

const Home = () => {
<<<<<<< HEAD
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
=======
  const [tuits, setTuits] = useState([]);
  const [tuitText, setTuitText] = useState('');
  const [files, setFiles] = useState([]);

  const findTuits = () =>
      service.findAllTuits()
        .then(tuits => setTuits(tuits));

  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);

  const createTuit = () => {
    if(files.length > 6){
      window.alert('Only allows 6 media at this moment');
      return;
    }

    const tuit = new FormData();

    let hasImage = false;
    let hasVideo = false;
    for(const file of files){
      const fileName = file.name;
      const fileInfo = fileName.split(".");
      const format = fileInfo.at(-1).toLowerCase();
      if(format === 'jpeg' || format === 'png' || format === 'jpg'){
        hasImage = true;
        tuit.append('image', file);
      }else if(format === 'mp4'){
        hasVideo = true;
        tuit.append('video', file);
      }else{
        window.alert('Please check file format. Images: jpeg/png/jpg; video: mp4');
        return;
      }

      if(hasImage && hasVideo){
        window.alert('Please do not upload image and video at the same time' );
        return;
      }
  }

    tuit.append('tuit', tuitText);

    return service.createTuit('my', tuit)
        .then(findTuits)
  }

  const uploadFileHandler = (event) =>{
    setFiles(event.target.files);
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
                <input type="file" multiple onChange={uploadFileHandler} accept=".jpg,.png,.jpeg,.mp4"/>
              </div>
              <div className="col-2">
                <a onClick={createTuit}
                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                  Tuit
                </a>
              </div>
>>>>>>> master
            </div>
        </div>
    );
};
export default Home;