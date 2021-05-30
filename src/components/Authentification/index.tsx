import React from "react";
import books from "../../img/books.png";
import "./style.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { UserModel } from "./models";
import { connect } from "react-redux";
import { loginUser } from '../../actions';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh:true});


class Authentification extends React.Component<
  UserModel.Props,
  UserModel.State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      User: {
        login: "",
        password: "",
      },
      errors: [],
      isAuthorized: 'false'
    };
  }

  

  fieldChange = (e: any, fieldName: string) => {
    this.setState({
      User: {
        ...this.state.User,
        [fieldName]: e.target.value,
      },
    });
  };

  checkEmptyFields = () => {
    if (this.state.User.login !== "" && this.state.User.password !== "")
      return true;
  };

  userLogin = () => {
    this.setState({ errors: [] });
    const { User, errors } = this.state;
    console.log(User);
    if (this.checkEmptyFields()) {
      return fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify(User)
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            isAuthorized: 'true'
          })
          localStorage.setItem("access_token", res.accessToken);
          localStorage.setItem("fullName", res.user.fullName);
          localStorage.setItem("user_id", res.user.id);
          localStorage.setItem("user_role", res.user.role);
          localStorage.setItem("isAuth", this.state.isAuthorized);
          history.push('/home');
        });
    }
    else {
      this.setState({
        errors: [...errors, "Заполните все поля!"]
      })
    }
  }

  render() {
    return (
      <div className="authentification">
        <div className="auth__content row justify-content-center align-items-center m-auto">
          <div className="col-6">
            <img src={books} alt="" />
          </div>
          <div className="col-6">
            <div className="auth__content--form p-4">
              <h2 className="text-center mb-5">ВХОД В БИБЛИОТЕКУ</h2>
              <form
                className="d-flex flex-column"
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="filled-basic"
                  label="Логин"
                  variant="filled"
                  className="mb-5"
                  value={this.state.User.login}
                  onChange={(e) => this.fieldChange(e, "login")}
                />

                <TextField
                  id="filled-basic"
                  label="Пароль"
                  variant="filled"
                  className="mb-5"
                  value={this.state.User.password}
                  onChange={(e) => this.fieldChange(e, "password")}
                />
                <div className="text-danger">
                  {this.state.errors.map((item: any, i: any) => (
                    <div className="row">
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <Button variant="contained" size="medium" color="primary" onClick={this.userLogin}>
                  Войти
                </Button>

                <span>
                  Еще нет аккаунта? Для создания кликните
                  <Link to="/registration" className="header__navigation--link">
                    здесь
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (User: any) => dispatch(loginUser(User))
})
export default connect(null, mapDispatchToProps)(Authentification);
