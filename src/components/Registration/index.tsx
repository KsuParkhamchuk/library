import React from "react";
import "./style.css";
import { UserModel } from "./models";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {registerNewUser} from '../../actions';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh:true});

class Registration extends React.Component<UserModel.Props, UserModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
      newUser: {
        fullName: "",
        login: "",
        password: "",
        role: 'USER'
      },
      passwordConfirmation: "",
      sessionToken: "",
      errors: [],
      isRegistrationOk: false,
      isAuthorized: 'false',
      firstTime: ''
    };
  }

  fieldChange = (e: any, fieldName: string) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [fieldName]: e.target.value,
      },
    });
  };

  userPasswordConfirmationOnChange = (e: any) => {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  };

  comparePasswords = () => {
    return this.state.newUser.password == this.state.passwordConfirmation;
  };

  checkEmptyFields = () => {
    if (
      this.state.newUser.login !== "" &&
      this.state.newUser.fullName !== "")
      return true;
  };

 

  userSignUp = (e: any) => {
    this.setState({ errors: [] });
    const { newUser, passwordConfirmation, errors } = this.state;
    if (this.comparePasswords()) {
      if (this.checkEmptyFields()) {
        return fetch(`http://localhost:8080/api/v1/users`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.state.newUser)
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.setState({
              isAuthorized: 'true'
            })
            localStorage.setItem("access_token", res.accessToken);
            localStorage.setItem("fullName", res.fullName);
            localStorage.setItem("user_id", res.id);
            localStorage.setItem("user_role", res.role);
            localStorage.setItem("isAuth", this.state.isAuthorized);
            localStorage.setItem("first", this.state.firstTime);
            history.push('/home');
          });
      } else {
        this.setState({
          errors: [...errors, "Все поля обязательны для заполнения"],
        });
      }
    } else {
      this.setState({
        errors: [...errors, "Пароли не совпадают"],
      });
    }
  };

  render() {
    return (
      <div className="registrationForm d-flex justify-content-center align-items-center">
        <form id="formRegistration" action="">
          <div className="formRegistration__content">
              <Link to="/" className="backToStartBtn">
                Назад
              </Link>
            <h2 className="text-center mb-4">Registration</h2>

            <TextField
              id="standard-basic"
              label="Name"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "fullName")}
              value={this.state.newUser.fullName}
              type="text"
              helperText="*Required."
            />
            <br />
            
            <TextField
              id="standard-basic"
              label="Login"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "login")}
              value={this.state.newUser.login}
              type="text"
              helperText="*Required."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Password"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "password")}
              value={this.state.newUser.password}
              type="password"
              helperText="*Поле обязательно для заполнения."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Confirm password"
              className="formRegistartion__input mb-3 w-100"
              onChange={this.userPasswordConfirmationOnChange}
              value={this.state.passwordConfirmation}
              type="password"
              helperText="*Required."
            />
            <br />
            <div className="text-danger">
              {this.state.errors.map((item: any, i: any) => (
                <div className="row">
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="formRegistration__button--wrapper">
              <button
                className="formRegistrationBtn w-100 my-3"
                onClick={this.userSignUp}
                type="button"
              >
                Зарегистрироваться
              </button>
             
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  saveUser: (newUser:any) => dispatch(registerNewUser(newUser))
})
export default connect(null, mapDispatchToProps)(Registration);
