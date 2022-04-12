import React, {useState} from "react";
import * as service from "../../services/tuits-service";
import {MY, roundedImage} from "../../services/utils";
import * as errorServices from "../../services/error-services";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors";

const CreateTuit = () => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    const VIDEO_FORMATS = ["mp4"]
    const [tuitText, setTuitText] = useState("");
    const [files, setFiles] = useState([]);
    const profile = useSelector(getProfile);
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
        const tuit = new FormData();
        for (const file of files) {
            const fileName = file.name;
            const format = fileName.split(".").at(-1).toLowerCase();
            if (IMAGE_FORMATS.indexOf(format) >= 0) {
                tuit.append('image', file);
            } else if (VIDEO_FORMATS.indexOf(format) >= 0) {
                tuit.append('video', file);
            } else {
                alert(`Unsupported file format: ${format}`);
                return;
            }
        }
        tuit.append('tuit', tuitText);
        service.createTuit(MY, tuit)
            .then((tuit) => {
                window.location.reload();
                setTuitText("");
                setFiles([]);
            }).catch(e => errorServices.alertError(e));
    }
    return (
        <>
            {
                profile &&
                <div className={"col-12 border-bottom pb-3"}>
                    <div className={"row m-0 align-items-center"}>
                        <div className={"col-2"}>
                            <img className={"img-fluid rounded-circle border border-2"}
                                 src={roundedImage(profile.profilePhoto ? profile.profilePhoto : "")} alt={"..."}/>
                        </div>
                        <div className="col-10">
                        <textarea
                            onChange={(e) =>
                                setTuitText(e.target.value)}
                            placeholder="What's happening?"
                            className="col-12 border-0 p-2" value={tuitText}/>
                            {
                                files.length > 0 &&
                                files.map((f, nth) =>
                                    <span key={nth} className={"badge bg-secondary me-3 position-relative"}>
                                    {f.name || f}
                                        <span
                                            className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"}
                                            onClick={() => deleteFileHandler(f)}>
                                        <i className={"fa-solid fa-xmark"}/>
                                    </span>
                                </span>)}
                            <div className="row align-items-center m-0">
                                <div className="col-8 fs-4 text-primary">
                                    <div className={"row justify-content-evenly align-items-center"}>
                                        <label className={"col-3 nav-link"}>
                                            <i className=" fa-solid fa-image text-center"/>
                                            <input className={"d-none"} type="file" multiple
                                                   onChange={uploadImageHandler}
                                                   accept={IMAGE_FORMATS.map(f => `.${f}`).join(",")}/>
                                        </label>
                                        <label className={"col-3 nav-link"}>
                                            <i className="col-3 fa-solid fa-camera text-center"/>
                                            <input className={"d-none"} type="file" multiple
                                                   onChange={uploadVideoHandler}
                                                   accept={VIDEO_FORMATS.map(f => `.${f}`).join(",")}/>
                                        </label>
                                        <label className={"col-3"}><i
                                            className="fa-solid fa-chart-bar text-center"/></label>
                                        <label className={"col-3"}><i
                                            className="fa-solid fa-face-smile text-center"/></label>
                                    </div>
                                </div>
                                <button onClick={createTuit} className={`col-4 btn btn-primary rounded-pill fw-bold`}>
                                    Tuit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
};
export default CreateTuit;