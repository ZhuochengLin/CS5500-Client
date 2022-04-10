import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

const Home = () => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    const VIDEO_FORMATS = ["mp4"]
    const [tuits, setTuits] = useState([]);
    const [tuitText, setTuitText] = useState('');
    const [files, setFiles] = useState([]);
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
    const uploadImageHandler = (event) => {
        const newFiles = [...event.target.files];
        if (newFiles.length > 6) {
            alert("Maximum 6 images");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
        }
    }
    const uploadVideoHandler = (event) => {
        const newFiles = [...event.target.files];
        if (newFiles.length > 1) {
            alert("Maximum 1 video");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
        }
    }
    const deleteFileHandler = (target) => {
        setFiles(files.filter(f => f.name !== target.name));
    }
    const createTuit = () => {
        if (files.length > 6) {
            alert('Only allows 6 media at this moment');
            return;
        }
        const tuit = new FormData();
        let hasImage = false;
        let hasVideo = false;
        for (const file of files) {
            const fileName = file.name;
            const fileInfo = fileName.split(".");
            const format = fileInfo.at(-1).toLowerCase();
            if (format === 'jpeg' || format === 'png' || format === 'jpg') {
                hasImage = true;
                tuit.append('image', file);
            } else if (format === 'mp4') {
                hasVideo = true;
                tuit.append('video', file);
            } else {
                alert('Please check file format. Images: jpeg/png/jpg; video: mp4');
                return;
            }

            if (hasImage && hasVideo) {
                alert('Please do not upload image and video at the same time');
                return;
            }
        }
        tuit.append('tuit', tuitText);

        service.createTuit('my', tuit).then(findTuits)
    }
    return (
        <div className={"row m-0 border-start border-end pt-2"}>
            <h1 className="col-12 fw-bold fs-2">Home Screen</h1>
            <div className={"col-12"}>
                <div className={"row m-0 align-items-center"}>
                    <div className={"col-2"}>
                        Avatar
                    </div>
                    <div className="col-10">
                        <textarea
                            onChange={(e) =>
                                setTuitText(e.target.value)}
                            placeholder="What's happening?"
                            className="col-12 border-0 p-2"/>
                        {
                            files.length > 0 &&
                            files.map((f, nth) =>
                                <span key={nth} className={"badge bg-secondary me-3 position-relative"}>
                                    {f.name}
                                    <span className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"} onClick={() => deleteFileHandler(f)}>
                                        <i className={"fa-solid fa-xmark"}/>
                                    </span>
                                </span>)}
                        <div className="row align-items-center overflow-hidden m-0">
                            <div className="col-8 fs-4 text-primary">
                                <div className={"row justify-content-evenly align-items-center"}>
                                    <label className={"col-3"}><i className="fa-solid fa-image-portrait text-center"/></label>
                                    <label className={"col-3 nav-link"}>
                                        <i className=" fa-solid fa-image text-center"/>
                                        <input className={"d-none"} type="file" multiple onChange={uploadImageHandler}
                                               accept=".jpg,.png,.jpeg"/>
                                    </label>
                                    <label className={"col-3 nav-link"}>
                                        <i className="col-3 fa-solid fa-camera text-center"/>
                                        <input className={"d-none"} type="file" multiple onChange={uploadVideoHandler}
                                               accept=".mp4"/>
                                    </label>
                                    <label className={"col-3"}><i className="fa-solid fa-face-smile text-center"/></label>
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