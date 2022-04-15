import React from "react";
import TuitImage from "./tuit-image";
import {Carousel} from "react-bootstrap";

const TuitImages = ({tuit, deleteHandler}) => {
    const images = tuit.image || [];
  return(

          <Carousel>
              {images && images.map((image, nth) =>
                  <Carousel.Item key={nth} className={"col-12 position-relative"}>
                      <TuitImage image={image} deleteHandler={deleteHandler}/>
                      {
                          deleteHandler &&
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                                onClick={() => deleteHandler(image, "image")}>
                            Remove
                          </span>
                      }
                  </Carousel.Item>
              )}
          </Carousel>

  );
};
export default TuitImages;
