import React from 'react'
import './style.css'
import books from "../../img/books.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {loginUser} from '../../actions';
import banner from "../../img/home.png";
import Header from '../Header'

class Home extends React.Component<any,any> {

    render() {
        return (
            <div>
                <div className="banner"><img src={banner} alt=""/></div>
                <Header></Header>
            </div>
        )
    }
}

export default Home