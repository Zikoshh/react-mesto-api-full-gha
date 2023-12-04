import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import api from "../../utils/Api.js";
import Header from "../Header/index.jsx";
import Main from "../Main/index.jsx";
import ImagePopup from "../ImagePopup/index.jsx";
import EditProfilePopup from "../EditProfilePopup/index.jsx";
import EditAvatarPopup from "../EditAvatarPopup/index.jsx";
import AddPlacePopup from "../AddPlacePopup/index.jsx";
import DeleteCardPopup from "../DeleteCardPopup/index.jsx";
import Register from "../Register/index.jsx";
import Login from "../Login/index.jsx";
import ProtectedRoute from "../ProtectedRoute/index.jsx";
import InfoTooltip from "../InfoTooltip/index.jsx";
import * as mestoAuth from "../../utils/mestoAuth.jsx";
import successfullyIcon from "../../image/successfully-icon.svg";
import unSuccessfullyIcon from "../../image/unsuccessful-icon.svg";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccesfully, setIsSuccesfully] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    auth();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCardToDelete(card);
  }

  function handleCardDeleteSubmit() {
    setIsLoading(true);
    api
      .deleteCard(selectedCardToDelete._id)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== selectedCardToDelete._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(enteredData) {
    mestoAuth
      .signIn(enteredData)
      .then(() => {

        setIsLoggedIn(true);
        setUserEmail(enteredData.email);
      })
      .catch((err) => {
        console.error(err);
        setIsSuccesfully(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(enteredData) {
    mestoAuth
      .signUp(enteredData)
      .then(() => {
        setIsSuccesfully(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.error(err);
        setIsSuccesfully(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleExit() {
    mestoAuth
      .signOut()
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsLoggedIn(false);
        setUserEmail("");
      })
      .catch((err) => {
        console.error(err);
        setIsSuccesfully(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function auth() {
    mestoAuth
      .authCheck()
      .then((res) => {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onExit={handleExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                component={Main}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to={"/"} /> : <Navigate to={"/sign-in"} />
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDeleteSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={isSuccesfully ? successfullyIcon : unSuccessfullyIcon}
          text={
            isSuccesfully
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз"
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
