import React from "react";
import TuitImage from "./tuit-image";

const TuitImages = ({tuit}) => {
    const images = tuit.image || [];
  return(

          <div>
              {images && images.map((image) =>
                  <TuitImage image={image}/>
              )}
          </div>

  );
};
export default TuitImages;
