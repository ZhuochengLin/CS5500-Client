import {roundedImage} from "../../services/utils";
import React from "react";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors";

const Avatar = ({user={profilePhoto: ""}}) => {
    return (
        <div className={"col-2"}>
            <img className={"img-fluid rounded-circle border border-2"}
                 src={roundedImage(user.profilePhoto ? user.profilePhoto : "")} alt={"..."}/>
        </div>
    )
};
export default Avatar;