import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import * as errorServices from "../../services/error-services";
import TuitVideo from "./tuit-video";
import TuitImages from "./tuit-images";
import CreateTuit from "../CreateTuit";
import UpdateTuit from "../UpdateTuit";

const TuitEdit = () => {
    const {tid} = useParams();
    const [tuit, setTuit] = useState({});
    const findTuitById = () => {
        service.findTuitById(tid)
            .then(t => {
                setTuit(t)
            }).catch(e => errorServices.alertError(e));
    }
    useEffect(findTuitById, []);
    return (
        <div className={"row m-0 border-start border-end pt-3"}>
            <div className={"col-12"}>
                <div className={"row m-0 align-items-center justify-content-start pe-2"}>
                    <Link to={-1} className={"col-1 text-decoration-none text-black"}>
                        <i className={"fa-solid fa-arrow-left"}/>
                    </Link>
                    <span className={"col-3 fs-2 fw-bold text-nowrap"}>
                        Edit Tuit
                    </span>
                </div>
            </div>
            {tuit && tuit.tuit && tuit.image && <UpdateTuit tuit={tuit}/>}
        </div>
    )
};
export default TuitEdit;