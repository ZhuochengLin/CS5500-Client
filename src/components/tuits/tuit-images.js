import React from "react";
import TuitImage from "./tuit-image";

const TuitImages = ({tuit, deleteHandler}) => {
    const images = tuit.image || [];
  return(

          <>
              {images && images.map((image, nth) =>
                  <div key={nth} className={"col-12 position-relative"}>
                      <TuitImage image={image} deleteHandler={deleteHandler}/>
                      {
                          deleteHandler &&
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                                onClick={() => deleteHandler(image, "image")}>
                            Remove
                          </span>
                      }
                  </div>
              )}
          </>

  );
};
export default TuitImages;
