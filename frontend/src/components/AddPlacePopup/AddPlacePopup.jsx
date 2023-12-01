import PopupWithForm from "../PopupWithForm/index.jsx";
import { useForm } from "react-hook-form";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
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
    onAddPlace({
      name: data.name,
      link: data.link,
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
      title="Новое место"
      name="add-card"
      submitButtonText="Создать"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      formValidator={handleSubmit}
      isLoading={isLoading}
      loadingSubmitButtonText="Создание..."
      submitButtonAriaLabel="Кнопка добавления карточки"
    >
      <input
        className={`popup__input ${errors?.name && "popup__input_invalid"}`}
        name="name"
        type="text"
        placeholder="Название"
        maxLength="30"
        minLength="2"
        {...register("name", {
          required: "Поле обязательно к заполнению",
          minLength: { value: 2, message: "Минимальная длина названия 2" },
          maxLength: { value: 30, message: "Максимальная длина названия 30" },
        })}
      ></input>
      <p className={`popup__error ${errors?.name && "popup__error_active"}`}>
        {errors?.name && (errors?.name?.message || "Error!")}
      </p>
      <input
        className={`popup__input ${errors?.link && "popup__input_invalid"}`}
        name="link"
        type="text"
        placeholder="Ссылка на картинку"
        {...register("link", {
          required: "Поле обязательно к заполнению",
          pattern: {
            value:
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            message: "Некорректная ссылка",
          },
        })}
      ></input>
      <p className={`popup__error ${errors?.link && "popup__error_active"}`}>
        {errors?.link && (errors?.link?.message || "Error!")}
      </p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
