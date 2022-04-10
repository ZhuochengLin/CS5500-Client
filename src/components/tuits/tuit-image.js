import React from "react";
const TuitImage = ({tuit}) => {
  return(
    <>
      <img src={tuit.image[0]}
           className="img-fluid rounded"/>
      {
        tuit.imageOverlay &&
        <span
          className={`fa-2x text-white fw-bold bottom-0
                      ttr-tuit-image-overlay position-absolute`}>
          {tuit.imageOverlay}
        </span>
      }
    </>
  );
};
export default TuitImage;