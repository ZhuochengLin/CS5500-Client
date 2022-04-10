import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/security-service"
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currPath = location.pathname.split("/").at(-1);
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }
  return(
    <div className="row">
      <div className="col-12 border-start border-end">
        <h4 className="p-2 mb-0 pb-0 fw-bolder">
          {profile.username}
          <i className="fa-solid fa-circle-check text-primary"/>
        </h4>
        <div className="ps-2">67.6K Tuits</div>
        <div className="mb-5 position-relative">
          <div className={"text-center"}>Profile image</div>
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              Avatar
            </div>
          </div>
          <Link to="/profile/edit"
                className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
            Edit profile
          </Link>
          <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
            Logout
          </button>
        </div>

        <div className="col-12 p-2">
          <h4 className="fw-bolder pb-0 mb-0">
            {profile.username}<i className="fa fa-badge-check text-primary"/>
          </h4>
          <h6 className="pt-0">@{profile.username}</h6>
          <p className="pt-2">
            There's space for everybody. Sparkles
          </p>
          <div className={"col-12"}>
            <div className={"row m-0 text-nowrap align-items-center justify-content-start"}>
              <div className={"col mb-2 ps-0"}><i className="fa-solid fa-location-dot"/><span className={"ps-2"}>Pale Blue Dot</span></div>
              <div className={"col mb-2 ps-0"}><i className="fa-solid fa-link"/><a href="nasa.gov" className="text-decoration-none ps-2">nasa.gov</a></div>
              <div className={"col mb-2 ps-0"}><i className="fa-solid fa-cake-candles"/><span className={"ps-2"}>Born October 1, 1958</span></div>
              <div className={"col mb-2 ps-0"}><i className="col fa-solid fa-calendar"/><span className={"ps-2"}>Joined December 2007</span></div>
            </div>
          </div>
          <div className={"col-12"}>
            <b>178</b> Following
            <b className="ms-4">51.1M</b> Followers
          </div>
          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className={`nav-link ${currPath === "mytuits" || currPath === "profile" ? 'active':''}`}>
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className={`nav-link ${currPath === "tuits-and-replies" ? 'active':''}`}>
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/mymedia"
                    className={`nav-link ${currPath === "mymedia" ? 'active':''}`}>
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/likes"
                    className={`nav-link ${currPath === "likes" ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/dislikes"
                    className={`nav-link ${currPath === "dislikes" ? 'active':''}`}>
                Dislikes</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={"col-12 border-start border-end pt-2"}>
        <Outlet/>
      </div>
    </div>
  );
}
export default Profile;