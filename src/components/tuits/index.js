import React from "react";
import Tuit from "./tuit";

const Tuits = ({tuits = [], refreshTuits}) => {
    return (
        <div className={"list-group"}>
            {
                tuits.map && tuits.map(tuit =>
                    <Tuit key={tuit._id}
                          refreshTuits={refreshTuits}
                          tuit={tuit}/>)
            }
        </div>
      );
}

export default Tuits;