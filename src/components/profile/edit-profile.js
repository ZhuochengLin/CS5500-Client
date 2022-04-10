import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as userServices from "../../services/users-service";

const EditProfile = () => {
    const [updatedUser, setUpdatedUser] = useState({
        username: "lin", firstName: "Zhuocheng", lastName: "Lin",
        headerImage: "", profilePhoto: "", bio: "Hello it's me", dateOfBirth: "1997-01-01",
        email: "xxx@gmail.com"
    });
    const inputOnChangeHandler = (e, field) => {
        const newUser = {...updatedUser};
        newUser[field] = e.target.value;
        setUpdatedUser(newUser);
    }
    const fileInputOnChangeHandler = (e, field) => {
        const newUser = {...updatedUser};
        newUser[field] = e.target.files[0];
        setUpdatedUser(newUser);
    }
    return(
      <div className="row m-0 border-start border-end">
          <div className={"col-12 p-3 pb-0"}>
              <div className={"row m-0 align-items-center justify-content-between"}>
                  <Link to="/profile" className="col-1 text-black fw-bolder">
                      <i className="fa-solid fa-close"/>
                  </Link>
                  <h1 className={"col-9"}>Edit profile</h1>
                  <Link to="/profile" className="col-2 btn btn-dark rounded-pill fw-bolder">
                      Save
                  </Link>
              </div>
          </div>
              <div className="mb-5 position-relative text-center">
                  Profile Image
                  <div className="bottom-0 left-0 position-absolute">
                      <div className="position-relative">
                          Avatar
                      </div>
                  </div>
              </div>
          <form>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="username">Username</label>
              <input id="username" title="Username" readOnly
                     className="p-0 form-control border-0"
                     placeholder="alan" value={updatedUser.username}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="first-name">First name</label>
              <input id="first-name"
                     className="p-0 form-control border-0"
                     placeholder="Alan" value={updatedUser.firstName ? updatedUser.firstName : ""}
                     onChange={(e) => inputOnChangeHandler(e, "firstName")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="last-name">Last name</label>
              <input id="last-name"
                     className="p-0 form-control border-0"
                     placeholder="Turin" value={updatedUser.lastName ? updatedUser.lastName : ""}
                     onChange={(e) => inputOnChangeHandler(e, "lastName")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="p-0 form-control border-0"
                id="bio" value={updatedUser.bio ? updatedUser.bio : ""}
                onChange={(e) => inputOnChangeHandler(e, "bio")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="date-of-birth">Date of birth</label>
              <input id="date-of-birth"
                     className="p-0 form-control border-0"
                     type="date" value={updatedUser.dateOfBirth ? updatedUser.dateOfBirth : ""}
                     onChange={(e) => inputOnChangeHandler(e, "dateOfBirth")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="email">Email</label>
              <input id="email" placeholder="alan@cam.ac.uk"
                     className="p-0 form-control border-0"
                     type="email" value={updatedUser.email ? updatedUser.email : ""}
                     onChange={(e) => inputOnChangeHandler(e, "email")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="password">Reset password</label>
              <input id="password"
                     className="p-0 form-control border-0"
                     type="password"
                     onChange={(e) => inputOnChangeHandler(e, "password")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="photo">Profile photo</label>
              <input id="photo"
                     className="p-0 form-control border-0"
                     type="file" accept={".jpg,.jpeg,.png"}
                     onChange={(e) => fileInputOnChangeHandler(e, "profilePhoto")}/>
            </div>
            <div className="border rounded-3 p-2 mb-3">
              <label htmlFor="header">Header image</label>
              <input id="header"
                     className="p-0 form-control border-0"
                     type="file" accept={".jpg,.jpeg,.png"}
                     onChange={(e) => fileInputOnChangeHandler(e, "headerImage")}/>
            </div>
        </form>
      </div>
    );
};
export default EditProfile;