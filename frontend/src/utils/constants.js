const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const formPopupProfile = document.querySelector(".popup__form_edit");
const buttonSubmitPopupProfile =
  formPopupProfile.querySelector(".popup__submit");
const inputUserName = formPopupProfile.querySelector(".popup__input_user-name");
const inputAboutUser = formPopupProfile.querySelector(
  ".popup__input_about-user"
);
const userName = document.querySelector(".profile__title");
const aboutUser = document.querySelector(".profile__subtitle");

const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const formPopupCard = document.querySelector(".popup__form_add");
const buttonSubmitPopupCard = formPopupCard.querySelector(".popup__submit");

const userAvatar = document.querySelector(".profile__avatar");
const buttonOpenPopupAvatar = document.querySelector(".profile__avatar-edit");
const formPopupAvatar = document.querySelector(".popup__form_edit-avatar");
const buttonSubmitPopupAvatar = formPopupAvatar.querySelector(".popup__submit");

const classesForValidation = {
  formInput: "popup__input",
  formInputInvalid: "popup__input_invalid",
  formSubmit: "popup__submit",
  formSubmitDisabled: "popup__submit_disabled",
  formErrorActive: "popup__error_active",
};

export {
  buttonOpenPopupProfile,
  formPopupProfile,
  buttonSubmitPopupProfile,
  inputUserName,
  inputAboutUser,
  userName,
  aboutUser,
  buttonOpenPopupCard,
  formPopupCard,
  buttonSubmitPopupCard,
  userAvatar,
  buttonOpenPopupAvatar,
  formPopupAvatar,
  buttonSubmitPopupAvatar,
  classesForValidation,
};
