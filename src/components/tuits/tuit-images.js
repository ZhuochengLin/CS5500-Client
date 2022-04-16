import React from "react";
import TuitImage from "./tuit-image";
import {Carousel} from "react-bootstrap";

const TuitImages = ({tuit, deleteHandler}) => {
    const images = tuit.image || [];
    const multipleImages = images.length > 1;
    return (
        <Carousel
            controls={multipleImages}
            indicators={multipleImages}
            interval={null}
            onClick={(event) => event.stopPropagation()}
        >
            {images && images.map((image, nth) =>
                <Carousel.Item key={nth}>
                    <TuitImage image={image} deleteHandler={deleteHandler}/>

                </Carousel.Item>
            )}
        </Carousel>

    );
};
export default TuitImages;
