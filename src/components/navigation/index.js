import React from "react";
import "./navigation.css";
import {useLocation, Link} from "react-router-dom";

function Navigation() {
<<<<<<< HEAD
    const {pathname} = useLocation();
    const links = [
        {label: 'Home', icon: 'fa-solid fa-house-chimney', path: '/home'},
        {label: 'Explore', icon: 'fa-hashtag', path: '/explore'},
        {label: 'Notifications', icon: 'fa-solid fa-bell', path: '/notifications'},
        {label: 'Messages', icon: 'fa-solid fa-envelope', path: '/messages'},
        {label: 'Bookmarks', icon: 'fa-solid fa-bookmark', path: '/bookmarks'},
        {label: 'Lists', icon: 'fa-solid fa-list', path: '/lists'},
        {label: 'Profile', icon: 'fa-solid fa-address-card', path: '/profile/mytuits'},
        {label: 'More', icon: 'fa-solid fa-ellipsis', path: '/more'},
        {label: 'Login', icon: 'fa-solid fa-user', path: '/login'},
        {label: 'Signup', icon: 'fa-solid fa-user-plus', path: '/signup'},
    ]
    return (
        <>
            <ul className="col-12 list-group">
                <li className={"list-group-item border-0"}>
                    <div className={"row align-items-center"}>
                        <i className={`col-3 fa fa-brands fa-twitter text-center text-primary fs-4`}/>
                    </div>
                </li>
                {
                    links.map((link, ndx) => {
                        return (
                            <li key={ndx}
                                className={`list-group-item border-0 ${link.path.indexOf(pathname.split("/").at(-1)) > 0 ? 'fw-bold' : ''}`}>
                                <Link to={link.path} id={link.label}
                                      className="text-decoration-none text-black">
                                        <div className={"row align-items-center"}>
                                            <i className={`col-3 fa ${link.icon} text-center`}/>
                                            <span className="col-9 ps-1 d-none d-lg-block">{link.label}</span>
                                        </div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
            <a href="#" className="col-12 mt-2 btn btn-primary rounded-pill fw-bold text-white">
                Tuit</a>
        </>
    );
}
=======
  const {pathname} = useLocation();
  // console.log(location.pathname);
  const links = [
    {label: 'Tuiter', icon: 'fa-twitter', path: '/tuiter'},
    {label: 'Home', icon: 'fa-home', path: '/home'},
    {label: 'Explore', icon: 'fa-hashtag', path: '/explore'},
    {label: 'Notifications', icon: 'fa-bell', path: '/notifications'},
    {label: 'Messages', icon: 'fa-envelope', path: '/messages'},
    {label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks'},
    {label: 'Lists', icon: 'fa-list', path: '/lists'},
    {label: 'Profile', icon: 'fa-user', path: '/profile/mytuits'},
    {label: 'More', icon: 'fa-bars', path: '/more'},
    {label: 'Login', icon: 'fa-user', path: '/login'},
    {label: 'Signup', icon: 'fa-user', path: '/signup'},
  ]
  return(
    <div className="ttr-navigation">
     <ul className="list-group">
      {
      links.map((link, ndx) => {
        return(
        <li key={ndx} className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
         ${pathname.indexOf(link.path) >= 0 ? 'fw-bold':''}`}>
          <Link to={link.path} id={link.label}
             className="text-decoration-none text-black">
            <i className={`fa ${link.icon} text-center`}></i>
            <span className="ttr-label">{link.label}</span>
          </Link>
        </li>
        );
      })
      }
      </ul>
     <a href="#" className="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">
      Tuit</a>
    </div>
  );
};
>>>>>>> master

export default Navigation;