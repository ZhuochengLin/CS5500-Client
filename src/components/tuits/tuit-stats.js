import React from "react";

const TuitStats = ({tuit, likeTuit = () => {}}) => {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="fa fa-message me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-replies">{tuit.stats.replies}</span>
          }
        </div>
        <div className="col">
          <i className="fa fa-retweet me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
          }
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {
                tuit.stats.likes > 0 &&
                  <i className="fa fa-heart me-1" style={{color: 'red'}}></i>
              }
              {
               tuit.stats.likes <= 0 &&
                  <i className="fa fa-heart me-1"></i>
              }
            <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
          </span>
        </div>
        <div className="col">
          <i className="fa fa-share"></i>
        </div>
      </div>
    );
}
export default TuitStats;