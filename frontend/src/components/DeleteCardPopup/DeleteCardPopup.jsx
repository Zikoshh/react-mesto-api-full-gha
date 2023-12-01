import PopupWithForm from "../PopupWithForm/index.jsx";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingSubmitButtonText="Удаление..."
      submitButtonAriaLabel="Кнопка подтверждения удаления карточки"
    />
  );
}

export default DeleteCardPopup;
