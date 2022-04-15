import React from "react";
const TuitImage = ({image, deleteHandler}) => {
  return(
    <>
      <img src={image}
           className="d-block w-100 align-content-center"/>
        {
            deleteHandler &&
            <span className="position-absolute top-50 start-50 translate-middle badge rounded-pill bg-secondary"
                  onClick={() => deleteHandler(image, "image")}>
                            Remove
                          </span>
        }
    </>
  )
};
export default TuitImage;
