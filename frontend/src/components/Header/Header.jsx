import logo from "../../image/header-logo.svg";
import { Route, Routes, Link } from "react-router-dom";

function Header({ userEmail, onExit }) {
  return (
    <header className="header">
      <a href="#">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>
      <div className="header__info">
        {userEmail ? userEmail : ""}
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Link
                className="header__link header__link_out"
                to="/sign-in"
                onClick={onExit}
              >
                Выйти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;
