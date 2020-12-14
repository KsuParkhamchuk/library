import React from 'react'
import books from "../../img/books.png";
import { Link } from "react-router-dom";
import './style.css'
import { AdminPageModel } from "./models";
import Creation from "../Creation";
import Statistics from "../Statistics";
import Button from "@material-ui/core/Button";

class AdminPage extends React.Component<AdminPageModel.Props,AdminPageModel.State> {

    constructor(props:any) {
        super(props);
        this.state = {
            panelState : true,
        }
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
                {this.state.panelState ? <Statistics></Statistics> : <Creation></Creation>}
            </div>
        )
    }
}

export default AdminPage