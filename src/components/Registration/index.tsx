import React from "react";
import "./style.css";
import { UserModel } from "./models";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {saveUser} from '../../actions';

class Registration extends React.Component<UserModel.Props, UserModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
      newUser: {
        firstName: "",
        lastName: "",
        login: "",
        password: "",
      },
      passwordConfirmation: "",
      sessionToken: "",
      errors: [],
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
      this.state.newUser.firstName !== "" &&
      this.state.newUser.lastName !== ""
    )
      return true;
  };

  protectedAPI = () => {
    fetch('http://192.168.100.18:8080/api/v1/protected/greeting', {
      method: "GET",
      headers: {
        "authorization": "bearer " + localStorage.getItem("access_token")
      }
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
  }

  userSignUp = (e: any) => {
    this.setState({ errors: [] });
    const { newUser, passwordConfirmation, errors } = this.state;
    if (this.comparePasswords()) {
      if (this.checkEmptyFields()) {
        this.props.saveUser(this.state.newUser);
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
            <h2 className="text-center mb-4">Регистрация</h2>

            <TextField
              id="standard-basic"
              label="Имя"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "firstName")}
              value={this.state.newUser.firstName}
              type="text"
              helperText="*Поле обязательно для заполнения."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Фамилия"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "lastName")}
              value={this.state.newUser.lastName}
              type="text"
              helperText="*Поле обязательно для заполнения."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Логин"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "login")}
              value={this.state.newUser.login}
              type="text"
              helperText="*Поле обязательно для заполнения."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Пароль"
              className="formRegistartion__input mb-3 w-100"
              onChange={(e) => this.fieldChange(e, "password")}
              value={this.state.newUser.password}
              type="password"
              helperText="*Поле обязательно для заполнения."
            />
            <br />
            <TextField
              id="standard-basic"
              label="Подтвердите пароль"
              className="formRegistartion__input mb-3 w-100"
              onChange={this.userPasswordConfirmationOnChange}
              value={this.state.passwordConfirmation}
              type="password"
              helperText="*Поле обязательно для заполнения."
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
                Sign up
              </button>
              <button
                className="formRegistrationBtn w-100 my-3"
                onClick={this.protectedAPI}
                type="button"
              >
               Запрос
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any) => ({
  saveUser: (newUser:any) => dispatch(saveUser(newUser))
})
export default connect(null, mapDispatchToProps)(Registration);
