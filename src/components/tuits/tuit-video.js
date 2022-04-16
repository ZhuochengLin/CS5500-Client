import React from "react";
import "./tuit-video.css";

const TuitVideo = ({tuit, deleteHandler}) => {
  return(
      <div className={"col-12 position-relative"}>
          <div id={"iframe-wrapper"} className={"row rounded overflow-hidden bg-black"}>
              <video width={"560"} height={"315"} controls>
                  <source src={tuit.video[0]} type={"video/mp4"}/>
              </video>
          </div>
        {
            deleteHandler &&
          <span className="position-absolute top-50 start-50 translate-middle badge rounded-pill bg-secondary"
                onClick={() => deleteHandler(tuit.video[0], "video")}>
            Remove
          </span>
        }
      </div>
  )
};
export default TuitVideo;
