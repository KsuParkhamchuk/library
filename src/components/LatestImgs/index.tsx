import React from "react";
import { LatestImgsModel } from "./models";
import "./style.css";

class LatestImgs extends React.Component<
  LatestImgsModel.Props,
  LatestImgsModel.State
> {
  render() {
    return (
      <div className="latestImgs">
        <div className="latestImgs__title">Latest images</div>
        <div className="latestImgs__content">
        <div className="latestImgs__content--wrapper">
          {this.props.latestImgs.map((item) => (
            <div className="latestImgs__wrapper--item">
              <img src={item} alt="" />
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  }
}

export default LatestImgs;
