import React from "react";
const TuitVideo = ({tuit}) => {
  return(
      <iframe src={tuit.video[0]}
              title="Video player"
              className="col-12"
              allowFullScreen/>
  )
};
export default TuitVideo;
