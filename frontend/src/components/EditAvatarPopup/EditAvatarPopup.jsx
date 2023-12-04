import PopupWithForm from '../PopupWithForm/index.jsx';
import { useForm } from 'react-hook-form';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  function onSubmit(data) {
    onUpdateAvatar({
      avatar: data.link,
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
      title="Обновить аватар"
      name="edit-avatar"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      formValidator={handleSubmit}
      isLoading={isLoading}
      loadingSubmitButtonText="Сохранение..."
      submitButtonAriaLabel="Кнопка обновления карточки"
    >
      <input
        className={`popup__input ${errors?.link && 'popup__input_invalid'}`}
        name="link"
        type="text"
        placeholder="Ссылка на картинку"
        {...register('link', {
          required: 'Поле обязательно к заполнению',
          pattern: {
            value:
              // eslint-disable-next-line no-useless-escape
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            message: 'Некорректная ссылка',
          },
        })}
      ></input>
      <p className={`popup__error ${errors?.link && 'popup__error_active'}`}>
        {errors?.link && (errors?.link?.message || 'Error!')}
      </p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
