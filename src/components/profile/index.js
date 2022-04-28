import React, {useEffect} from "react";
import {Link, Outlet, useNavigate, useLocation} from "react-router-dom";
import {logout, refresh} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import * as errorServices from "../../services/error-services";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {getDate, roundedImage} from "../../services/utils";
import "./style.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedIn = useSelector(isLoggedIn);
  const currPath = location.pathname.split("/").at(-1);
  const profile = useSelector(getProfile);
  const init = async () => {
    await refresh(dispatch);
    if (!loggedIn) {
      navigate("/login");
    }
  }
  const logoutButtonClick = () => {
    logout(dispatch)
        .then(() => navigate("/login"))
        .catch(e => errorServices.alertError(e));
  }
  useEffect(init, []);
  return(
      <>
        {loggedIn &&
            <div className="row m-0">
              <div className="col-12 border border-top-0">
                <h4 className="p-2 mb-0 pb-0 fs-2 fw-bolder">
                  {profile.username}
                  <i className="fa-solid fa-circle-check text-primary"/>
                </h4>
                <div className="ps-2">67.6K Tuits</div>
                <div className="mb-5 position-relative">
                  <div className={"header-image"}>
                    <div className={"w-100 position-relative"} style={{
                      backgroundImage: `url(${profile.headerImage ? profile.headerImage : ""})`,
                      backgroundSize: "cover"
                    }}>
                      <img className={"profile-photo position-absolute rounded-circle border border-2"}
                           src={roundedImage(profile.profilePhoto ? profile.profilePhoto : "")} alt={"..."}/>
                    </div>
                  </div>
                  <Link to="/profile/edit"
                        className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                    Edit profile
                  </Link>
                  <button onClick={logoutButtonClick} className="mt-2 float-end btn btn-warning rounded-pill">
                    Logout
                  </button>
                </div>

                <div className="col-12 p-2 pt-5">
                  <h4 className="fw-bolder pb-0 mb-0">
                    {profile.username}<i className="fa fa-badge-check text-primary"/>
                  </h4>
                  <h6 className="pt-0">@{profile.username}</h6>
                  <p className="pt-2">
                    {profile.bio ? profile.bio : "......"}
                  </p>
                  <div className={"col-12"}>
                    <div className={"row m-0 text-nowrap align-items-center justify-content-start"}>
                      <div className={"col mb-2 ps-0"}><i className="fa-solid fa-location-dot"/><span
                          className={"ps-2"}>Pale Blue Dot</span>
                      </div>
                      <div className={"col mb-2 ps-0"}>
                        <i className="fa-solid fa-link"/>
                        <a href="nasa.gov" className="text-decoration-none ps-2">nasa.gov</a>
                      </div>
                      <div className={"col mb-2 ps-0"}>
                        <i className="fa-solid fa-cake-candles"/>
                        <span className={"ps-2"}>{profile.dateOfBirth ? `Born ${getDate(profile.dateOfBirth)}` : "......"}</span>
                      </div>
                      <div className={"col mb-2 ps-0"}><i className="col fa-solid fa-calendar"/><span
                          className={"ps-2"}>{profile.joined ? `Joined ${getDate(profile.joined)}` : "......"} </span></div>
                    </div>
                  </div>
                  <div className={"col-12"}>
                    <b>178</b> Following
                    <b className="ms-4">51.1M</b> Followers
                  </div>
                  <ul className="mt-4 nav nav-pills nav-fill">
                    <li className="nav-item">
                      <Link to="/profile/mytuits"
                            className={`nav-link ${currPath === "mytuits" || currPath === "profile" ? 'active' : ''}`}>
                        Tuits</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile/tuits-and-replies"
                            className={`nav-link ${currPath === "tuits-and-replies" ? 'active' : ''}`}>
                        Tuits & replies</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile/mymedia"
                            className={`nav-link ${currPath === "mymedia" ? 'active' : ''}`}>
                        Media</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile/likes"
                            className={`nav-link ${currPath === "likes" ? 'active' : ''}`}>
                        Likes</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={"col-12 border-start border-end p-0 pt-2"}>
                <Outlet/>
              </div>
            </div>}
      </>
  );
}
export default Profile;