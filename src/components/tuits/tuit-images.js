import React from "react";
import TuitImage from "./tuit-image";
import Tuit from "./tuit";

const TuitImages = ({tuit}) => {
    const images = tuit.image || [];
    console.log(images);
    console.log(images);
  return(
      <div className='w-100'>
          {images && images.map((image) =>
              <img className='' src='http://res.cloudinary.com/cs5500project/image/upload/v1649474909/dncem2xncse8htpwhsyx.jpg'/>
          )}
      </div>
  );
};
export default TuitImages;