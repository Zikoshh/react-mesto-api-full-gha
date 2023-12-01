import { useContext } from "react";
import Footer from "../Footer/index.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import Card from "../Card/index.jsx";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          className="profile__avatar-edit"
          type="button"
          onClick={onEditAvatar}
          aria-label="Кнопка открытия попапа редактирования аватара"
        >
          <img
            className="profile__avatar"
            alt={currentUser.name}
            src={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
            aria-label="Кнопка открытия попапа редактирования информации о пользователе"
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
          aria-label="Кнопка открытия попапа создания карточки"
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Main;
