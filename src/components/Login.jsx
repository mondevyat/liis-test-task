import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui-kit/Button";
import { validEmail, validPassword } from "../utils/regex";
import classes from "./Login.module.scss";

const Login = () => {
  const login = useRef(null);
  const password = useRef(null);

  const login_error = useRef(null);
  const password_error = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("SHC-user")) navigate("/*");
  }, []);

  const loginHandler = async () => {
    const authData = {
      email: login.current.value,
      password: password.current.value,
      returnSecureToken: true,
    };

    if (authData.email.length === 0) {
      login_error.current.innerHTML = "Не введён email";
    }
    else if (validEmail.test(authData.email)) {
      login_error.current.innerHTML = `&nbsp;`;
    } else {
      login_error.current.classList.add(`${classes.error}`);
      login_error.current.innerHTML = "Неправильно введена почта";
    }

    if (authData.password.length === 0) {
      password_error.current.innerHTML = "Не введён пароль";
    }
    else if (validPassword.test(authData.password)) {
      password_error.current.innerHTML = "Присутствует кириллица";
    } else if (authData.password.length > 8) {
      password_error.current.innerHTML = `&nbsp;`;
    } else {
      password_error.current.innerHTML = "Минимум 8 символов в пароле";
    }

    if (!validPassword.test(authData.password) && authData.password.length > 8 && validEmail.test(authData.email)) {
      localStorage.setItem("SHC-user", authData.email.split("@")[0]);
      navigate("/*");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.blur}>
        <div className={classes.auth__form}>
          <form className={classes.login__form} action="">
            <p>Simple Hotel Check</p>
            <div className={classes.error__forms}>
              <label htmlFor="login">Логин</label>
              <input
                ref={login}
                className={classes.input}
                id="login"
                type="email"
              />
              <p className={classes.error} ref={login_error}>
                &nbsp;
              </p>
            </div>
            <div className={classes.error__forms}>
              <label htmlFor="password">Пароль</label>
              <input
                ref={password}
                className={classes.input}
                id="password"
                type="password"
              />
              <p className={classes.error} ref={password_error}>
                &nbsp;
              </p>
            </div>
            <Button
              text="Войти"
              onClick={() => loginHandler()}
              width="345px"
              height="50px"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
