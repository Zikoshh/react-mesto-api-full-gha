import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleClick() {
    onCardClick({
      name: card.name,
      link: card.link,
    });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
          aria-label="Кнопка удаления карточки"
        ></button>
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
          aria-label="Кнопка лайка карточки"
        ></button>
        <span className="card__likes-counter">{card.likes.length}</span>
      </div>
    </article>
  );
}

export default Card;
