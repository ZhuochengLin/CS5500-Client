import React from "react";
import TuitImage from "./tuit-image";
import {Carousel} from "react-bootstrap";

const TuitImages = ({tuit, deleteHandler}) => {
    const images = tuit.image || [];
    const multipleImages = images.length > 1;
  return(
          <Carousel prevIcon={<span className={`${multipleImages ? 'carousel-control-prev-icon' : ''}`}/>}
                    nextIcon={<span className={`${multipleImages ? 'carousel-control-next-icon' : ''}`}/>}
                    indicators={multipleImages}
                    interval={3000}
            >
              {images && images.map((image, nth) =>
                  <Carousel.Item key={nth} >
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
