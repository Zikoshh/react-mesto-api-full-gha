import { useEffect, useRef } from "react";

function PopupWithForm({
  title,
  name,
  submitButtonText,
  isOpen,
  onClose,
  onSubmit,
  formValidator,
  isLoading,
  loadingSubmitButtonText,
  submitButtonAriaLabel,
  children,
}) {
  const popupRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    function closeByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeByEsc);

    return () => document.removeEventListener("keydown", closeByEsc);
  }, [isOpen]);

  function closeByOverlay(e) {
    if (e.target === popupRef.current) {
      onClose();
    }
  }
  return (
    <section
      ref={popupRef}
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={closeByOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Кнопка закрытия попапа"
        ></button>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          action="#"
          name={name}
          onSubmit={formValidator ? formValidator(onSubmit) : onSubmit}
          noValidate
        >
          {children}
          <button
            className="popup__submit"
            type="submit"
            aria-label={submitButtonAriaLabel}
          >
            {isLoading ? loadingSubmitButtonText : submitButtonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
