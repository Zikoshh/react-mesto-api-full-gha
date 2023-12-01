function InfoTooltip({ isOpen, onClose, image, text }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия попапа подсказки"
          onClick={onClose}
        ></button>
        <img className="popup__hint-icon" src={image} />
        <h2 className="popup__title popup__title_tooltip">{text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
