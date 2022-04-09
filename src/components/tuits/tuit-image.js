import React from "react";
const TuitImage = ({image}) => {
    console.log(image);
  return(
    <div className="position-relative">
      <img src='http://res.cloudinary.com/cs5500project/image/upload/v1649474909/dncem2xncse8htpwhsyx.jpg'
           className="mt-2 w-100 ttr-rounded-15px"/>
    </div>
  );
};
export default TuitImage;