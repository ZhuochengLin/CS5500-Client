import React from "react";

const TuitStats = ({tuit, likeTuit = () => {}}) => {
    return (
      <div className="row m-0 mt-2">
        <div className="col-3">
            <div className={"row align-items-center"}>
                <i className="col fa-solid fa-message pe-0"/>
                {
                    tuit.stats &&
                    <span className={"col ps-0"}>{tuit.stats.replies}</span>
                }
            </div>
        </div>
        <div className="col-3">
            <div className={"row align-items-center"}>
                <i className="col fa-solid fa-retweet pe-0"/>
                {tuit.stats &&
                    <span className="col ps-0">{tuit.stats.retuits}</span>
                }
            </div>
        </div>
        <div className="col-3">
            <div className={"row align-items-center"}>
                <i className="col fa-solid fa-heart pe-0"/>
                <span className="col ps-0">{tuit.stats && tuit.stats.likes}</span>
            </div>
        </div>
        <div className="col-3">
          <i className="fa-solid fa-share-from-square"/>
        </div>
      </div>
    );
}
export default TuitStats;