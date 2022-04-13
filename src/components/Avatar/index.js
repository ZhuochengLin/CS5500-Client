import {roundedImage} from "../../services/utils";
import React from "react";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors";

const Avatar = () => {
    const profile = useSelector(getProfile);
    return (
        <div className={"col-2"}>
            <img className={"img-fluid rounded-circle border border-2"}
                 src={roundedImage(profile.profilePhoto ? profile.profilePhoto : "")} alt={"..."}/>
        </div>
    )
};
export default Avatar;