import React from "react";
import TuitImage from "./tuit-image";
import Tuit from "./tuit";

const TuitImages = ({tuit}) => {

    const images = tuit.images || [];
    console.log(images);
    console.log(images);
  return(
      <div>
          {images && images.map((image) =>{
              <img className='position-relative overflow-hidden w-100 mt-2' src ={image}/>
          })}
      </div>
  );
};
export default TuitImages;