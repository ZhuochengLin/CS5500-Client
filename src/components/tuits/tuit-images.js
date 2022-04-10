import React from "react";
import TuitImage from "./tuit-image";

const TuitImages = ({tuit}) => {
    const images = tuit.image || [];
  return(

          <div>
              {images && images.map((image, nth) =>
                  <TuitImage key={nth} image={image}/>
              )}
          </div>

  );
};
export default TuitImages;
