import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import nasaLogo from "../../img/nasa.png";

class Header extends React.Component<any> {
  render() {
    return (
      <header className="header">
        <nav className="header__navigation">
          <div className="col-6"></div>
           <div className="col-6 d-flex justify-content-between">
           <Link to='/home' className="header__navigation--link">
            Главная
          </Link>
          <Link to="/myPreferences" className="header__navigation--link">
            Моя подборка
          </Link>
          <Link to="/events" className="header__navigation--link">
            События
          </Link>
          <Link to="/personalPage" className="header__navigation--link">
            Моя страница
          </Link>
           </div>
         
        </nav>
      </header>
    );
  }
}

export default Header;
