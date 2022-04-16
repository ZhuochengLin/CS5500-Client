import React, {useState} from "react";
import * as service from "../../services/tuits-service";
import {MY} from "../../services/utils";
import * as errorServices from "../../services/error-services";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors";
import CreateTuitComponent from "../CreateTuitComponent";

const CreateTuit = () => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    const VIDEO_FORMATS = ["mp4"]
    const [tuitText, setTuitText] = useState("");
    const [files, setFiles] = useState([]);
    const profile = useSelector(getProfile);
    const uploadImageHandler = (event) => {
        const newFiles = [...event.target.files];
        // reset value so the same file won't be blocked
        event.target.value = "";
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
        event.target.value = "";
        if (newFiles.length > 1) {
            alert("Maximum 1 video");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
        }
    }
    const deleteFileHandler = (target) => {
        const newFiles = files.filter(f => f.name !== target.name);
        setFiles(newFiles);
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
    const textAreaOnChange = (e) => {
        setTuitText(e.target.value);
    }
    return (
        <>
            {
                profile &&
                <CreateTuitComponent uploadVideoHandler={uploadVideoHandler} uploadImageHandler={uploadImageHandler}
                                     tuitOnClick={createTuit} textAreaOnChange={textAreaOnChange} deleteFileHandler={deleteFileHandler}
                                     files={files} tuitText={tuitText}/>}
        </>
    )
};
export default CreateTuit;