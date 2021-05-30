import React from 'react'
import books from "../../img/books.png";
import { Link } from "react-router-dom";
import './style.css'
import { AdminPageModel } from "./models";
import Creation from "../Creation";
import Statistics from "../Statistics";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actions from "../../actions";


class AdminPage extends React.Component<AdminPageModel.Props,AdminPageModel.State> {

    constructor(props:any) {
        super(props);
        this.state = {
            panelState : true,
            baseUrl : 'http://localhost:8080/api/v1',
            authors: [],
            genres: [],
            events: {},
            books: {}
        }
    }

    componentWillMount() {
         this.setState({ authors: [] });
        fetch(`http://localhost:8080/api/v1/authors`,{
            headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            authors: data
        }));

        fetch(`http://localhost:8080/api/v1/genres`,{
            headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            genres: data
        }));
}

    changeState = (e:any, st:boolean) => {
        this.setState({panelState: st });
    }

    render() {
               return(
            <div>
                <div className="adminPage__header">
                    <div className="d-flex justify-content-between">
                        <div className="adminPage__header--img">
                            <img src={books} alt=""/>
                        </div>
                        <div className="adminPage__header--info">
                            <h3>Пархомчук Ксения Юрьевна</h3>
                            <div className="">Статус администратор</div>
                        </div>
                        <div className="adminPage__header--btns d-flex align-items-end">
                            <Button variant="contained" size="medium" color="primary" onClick={(e) => this.changeState(e,true)}>Статистика</Button>
                            <Button variant="contained" size="medium" color="primary" onClick={(e) => this.changeState(e,false)}>Создать</Button>
                        </div>
                    </div>
                </div>
                <div><ul>
                        {/* { this.props.genres.length != 0 ? genres.map(genre => <li >{genre}</li>) : null} */}
                        
                    </ul>
                </div>
                {this.state.panelState ? <Statistics></Statistics> : <Creation authors={this.props.authors} books={this.props.books} events={this.props.events} genres={this.props.genres}></Creation>}
            </div>
        );
    }
}


  
const mapStateToProps = (state : any) => ({
    
    genres: state.items,
    loading: state.loading,
    error: state.error
  });
  export default connect(null, mapStateToProps)(AdminPage);