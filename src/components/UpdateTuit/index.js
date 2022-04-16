import TuitVideo from "../tuits/tuit-video";
import TuitImages from "../tuits/tuit-images";
import React, {useState} from "react";
import * as service from "../../services/tuits-service";
import {MY} from "../../services/utils";
import * as errorServices from "../../services/error-services";
import {useNavigate} from "react-router-dom";
import CreateTuitComponent from "../CreateTuitComponent";

const UpdateTuit = ({tuit={tuit: "text content", image: [], video: []}}) => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    const VIDEO_FORMATS = ["mp4"]
    const navigate = useNavigate();
    const [tuitText, setTuitText] = useState(tuit.tuit);
    const [files, setFiles] = useState([]);
    const [newTuit, setNewTuit] = useState({...tuit});
    const deleteMediaHandler = (url, field) => {
        const temp = {...newTuit};
        temp[field] = temp[field].filter(l => l !== url);
        setNewTuit(temp);
    }
    const textAreaOnChange = (e) => {
        setTuitText(e.target.value);
    }
    const uploadImageHandler = (event) => {
        const newFiles = [...event.target.files];
        event.target.value = "";
        if (newFiles.length + newTuit.image.length > 6) {
            alert("Maximum 6 images");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
            // remove videos
            setNewTuit({...newTuit, video: []})
        }
    }
    const uploadVideoHandler = (event) => {
        const newFiles = [...event.target.files];
        event.target.value = "";
        if (newFiles.length + newTuit.video.length > 1) {
            alert("Maximum 1 video");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
            // remove images
            setNewTuit({...newTuit, image: []})
        }
    }
    const deleteFileHandler = (target) => {
        setFiles(files.filter(f => f.name !== target.name));
    }
    const updateTuit = () => {
        const tuitForm = new FormData();
        for (let file of files) {
            const fileName = file.name;
            const format = fileName.split(".").at(-1).toLowerCase();
            if (IMAGE_FORMATS.indexOf(format) >= 0) {
                tuitForm.append('image', file);
            } else if (VIDEO_FORMATS.indexOf(format) >= 0) {
                tuitForm.append('video', file);
            } else {
                alert(`Unsupported file format: ${format}`);
                return;
            }
        }
        tuitForm.append('tuit', tuitText);
        // add the remaining media links
        for (let url of newTuit.image) {
            tuitForm.append("image", url);
        }
        for (let url of newTuit.video) {
            tuitForm.append("video", url);
        }
        service.updateTuit(MY, newTuit._id, tuitForm)
            .then((status) => {
                navigate("/home");
            }).catch(e => errorServices.alertError(e));
    }
    return (
        <div className={"row m-0 mt-4"}>
            <CreateTuitComponent tuitText={tuitText} files={files} deleteFileHandler={deleteFileHandler} textAreaOnChange={textAreaOnChange}
                                 tuitOnClick={updateTuit} uploadImageHandler={uploadImageHandler} uploadVideoHandler={uploadVideoHandler}/>
            <div className={"col-12"}>
                <div className={"row ps-5 pe-5"}>
                    {
                        newTuit && newTuit.video && (newTuit.video.length !== 0) &&
                        <TuitVideo tuit={newTuit} deleteHandler={deleteMediaHandler}/>
                    }
                    {
                        newTuit && newTuit.image && (newTuit.image.length !== 0) &&
                        <TuitImages tuit={newTuit} deleteHandler={deleteMediaHandler}/>
                    }
                </div>
            </div>
        </div>
    )
};
export default UpdateTuit;