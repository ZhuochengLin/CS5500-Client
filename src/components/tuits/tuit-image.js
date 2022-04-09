import React from "react";
const TuitImage = ({image}) => {
  return(
    <div className="position-relative">
      <img src={image}
           className="mt-2 w-100 ttr-rounded-15px"/>
    </div>
  );
};
export default TuitImage;
