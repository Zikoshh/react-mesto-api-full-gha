import { useForm } from "react-hook-form";
import PopupWithForm from "../PopupWithForm/index.jsx";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  function onSubmit(data) {
    onUpdateUser({
      name: data.name,
      about: data.about,
    });
    reset();
  }

  function handleClose() {
    onClose();
    clearErrors();
    reset();
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      formValidator={handleSubmit}
      isLoading={isLoading}
      loadingSubmitButtonText="Сохранение..."
      submitButtonAriaLabel="Кнопка обновления информации о пользователе"
    >
      <input
        className={`popup__input ${errors?.name && "popup__input_invalid"}`}
        name="name"
        type="text"
        placeholder="Введите имя"
        maxLength="40"
        minLength="2"
        {...register("name", {
          required: "Поле обязательно к заполнению",
          minLength: { value: 2, message: "Минимальная длина для имени 2" },
          maxLength: { value: 40, message: "Максимальная длина для имени 40" },
        })}
      />
      <p className={`popup__error ${errors?.name && "popup__error_active"}`}>
        {errors?.name && (errors?.name?.message || "Error!")}
      </p>
      <input
        className={`popup__input ${errors?.about && "popup__input_invalid"}`}
        name="about"
        type="text"
        placeholder="О себе"
        maxLength="200"
        minLength="2"
        {...register("about", {
          required: "Поле обязательно к заполнению",
          minLength: { value: 2, message: "Минимальная длина поля 2" },
          maxLength: { value: 200, message: "Максимальная длина поля 200" },
        })}
      />
      <p className={`popup__error ${errors?.about && "popup__error_active"}`}>
        {errors?.about && (errors?.about?.message || "Error!")}
      </p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
