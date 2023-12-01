import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register({ onRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  function onSubmit(data) {
    onRegister({
      password: data.password,
      email: data.email,
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`auth__input ${errors?.email && "auth__input_invalid"}`}
          name="email"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Поле обязательно к заполнению",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Ваш email невалидный. Пример валидного email: email@mail.ru или email@gmail.com",
            },
          })}
        />
        <p className={`auth__error ${errors?.email && "auth__error_active"}`}>
          {errors?.email && (errors?.email?.message || "Error!")}
        </p>
        <input
          className={`auth__input ${errors?.password && "auth__input_invalid"}`}
          name="password"
          type="text"
          placeholder="Пароль"
          {...register("password", {
            required: "Поле обязательно к заполнению",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: "Ваш пароль должен содержать минимум 8 символов, символы верхнего и нижнего регистров, а так же цифры.",
            },
          })}
        />
        <p className={`auth__error ${errors?.password && "auth__error_active"}`}>
          {errors?.password && (errors?.password?.message || "Error!")}
        </p>
        <button
          className="auth__submit-button"
          type="submit"
          aria-label="Кнопка регистрации в приложение"
        >
          Зарегистрироваться
        </button>
        <p className="auth__yet">
          Уже зарегистрированы?{" "}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
