import React from "react";
import {useLocation, Link} from "react-router-dom";

function Navigation() {
    const {pathname} = useLocation();
    const currPath = pathname.split("/").at(-1);
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
            <ul className="col-12 list-group pt-2">
                <li className={"list-group-item border-0"}>
                    <div className={"row align-items-center"}>
                        <i className={`col-3 fa fa-brands fa-twitter text-center text-primary fs-4`}/>
                    </div>
                </li>
                {
                    links.map((link, ndx) => {
                        return (
                            <li key={ndx}
                                className={`list-group-item border-0 ${link.path.indexOf(currPath) > 0 ? 'fw-bold' : ''}`}>
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
            <Link to={"/home"} className="col-12 mt-2 btn btn-primary rounded-pill fw-bold text-white">
                Tuit</Link>
        </>
    );
}

export default Navigation;