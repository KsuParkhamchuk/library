import React from "react";
import "./style.css";
import sky from "../../img/satr-back.jpg";
import {Link} from 'react-router-dom'

class WelcomePage extends React.Component<any> {
  render() {
    return (
      <div
        className="starBackground"
        style={{
          backgroundImage: `url(${sky}`,
        }}>
        <div className="welcomeBanner">
          <div className="welcomeBanner__content">
            <h1 className="welcomeBanner__content--title">
              Welcome to NASA images gallery
            </h1>
            <div className="welcomeBanner__content--subtitle">One of the biggest star galleries in the world</div>
            <div className="welcomeBanner__content--line"></div>
            <div className="welcomeBanner__content--buttons">
              <Link to="/nasa-img-gallery" className="link">
                CURRENT IMAGE
              </Link>
              <Link to="/catalog" className="link">
                CATALOG
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
