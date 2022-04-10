import React from "react";
const TuitVideo = ({tuit}) => {
  return(
      <iframe src={tuit.video[0]}
              title="Video player"
              width="560" height="315"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen/>
  )
};
export default TuitVideo;
