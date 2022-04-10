import React from "react";
import whatsHappening from "./whats-happening-data.json";
import './whats-happening.css'

function WhatsHappening() {
 return(
  <div className="row m-0 pt-2">
   <div className="col-12 position-relative">
    <i className="fas fa-search position-absolute"/>
    <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
           placeholder="Search Tuiter"/>
   </div>
   <div className="col-12 bg-secondary bg-opacity-10 mt-2 p-3 rounded">
       <div className={"row m-0"}>
           <h1 className={"col-12 fs-2 fw-bold"}>What's happening</h1>
           {
               whatsHappening.map(wh => {
                   return(
                       <div key={wh._id} className="col-12 mb-3 p-0">
                           <div className={"row m-0 align-items-center"}>
                               <div className="col-9">
                                   <h2 className="fs-6 fw-lighter">
                                       {wh.topic} - {wh['hours-ago']} hours ago</h2>
                                   <div className="fw-bold mb-2 pe-1">
                                       {wh.content}
                                   </div>
                                   <div className="fs-6 fw-lighter">{wh.likes} likes</div>
                               </div>
                               <div className={"col-3"}>
                                   Avatar
                               </div>
                           </div>
                       </div>
                   );
               })
           }
       </div>
   </div>
  </div>
    );
}
export default WhatsHappening;