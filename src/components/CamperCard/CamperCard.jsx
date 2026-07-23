import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BsCarFront,
  BsDiagram3,
  BsFuelPump,
  BsHeart,
  BsHeartFill,
  BsMap,
  BsStarFill,
} from "react-icons/bs";

import { toggleFavorite } from "../../store/favoritesSlice";

import styles from "./CamperCard.module.css";

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "€0,00";
  }

  return `€${numericPrice.toFixed(2).replace(".", ",")}`;
};

const capitalize = (value) => {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatForm = (form) => {
  const formLabels = {
    alcove: "Alcove",
    panelTruck: "Panel Van",
    fullyIntegrated: "Integrated",
    semiIntegrated: "Semi Integrated",
  };

  return formLabels[form] || form;
};

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();

  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(camper.id);

  const imageSource =
    camper.gallery?.[0]?.thumb ||
    camper.gallery?.[0]?.original ||
    "";

  const reviewsCount = Array.isArray(camper.reviews)
    ? camper.reviews.length
    : 0;

  const filterValues = [
    camper.engine && {
      name: capitalize(camper.engine),
      icon: <BsFuelPump aria-hidden="true" />,
    },
    camper.transmission && {
      name: capitalize(camper.transmission),
      icon: <BsDiagram3 aria-hidden="true" />,
    },
    camper.form && {
      name: formatForm(camper.form),
      icon: <BsCarFront aria-hidden="true" />,
    },
  ].filter(Boolean);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <article className={styles.camperCard}>
      <div className={styles.content}>
        {imageSource ? (
          <img
            src={imageSource}
            alt={camper.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            No image available
          </div>
        )}

        <div className={styles.details}>
          <div className={styles.textContainer}>
            <div className={styles.headerRow}>
              <h2 className={styles.camperName}>{camper.name}</h2>

              <p className={styles.price}>
                {formatPrice(camper.price)}
              </p>
            </div>

            <div className={styles.locationAndRating}>
              <div className={styles.rating}>
                <BsStarFill
                  className={styles.starIcon}
                  aria-hidden="true"
                />

                <span>
                  {Number(camper.rating || 0).toFixed(1)}
                  ({reviewsCount}{" "}
                  {reviewsCount === 1 ? "Review" : "Reviews"})
                </span>
              </div>

              <p className={styles.location}>
                <BsMap aria-hidden="true" />
                {camper.location}
              </p>
            </div>
          </div>

          <p className={styles.description}>
            {camper.description}
          </p>

          <ul className={styles.features}>
            {filterValues.map(({ name, icon }) => (
              <li key={name} className={styles.feature}>
                {icon}
                <span className={styles.featureName}>{name}</span>
              </li>
            ))}
          </ul>

          <NavLink
            to={`/catalog/${camper.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Show more
          </NavLink>
        </div>
      </div>

      <button
        type="button"
        className={styles.favoriteIcon}
        onClick={handleToggleFavorite}
        aria-label={
          isFavorite
            ? `Remove ${camper.name} from favorites`
            : `Add ${camper.name} to favorites`
        }
      >
        {isFavorite ? (
          <BsHeartFill
            className={styles.filledHeart}
            aria-hidden="true"
          />
        ) : (
          <BsHeart className={styles.heart} aria-hidden="true" />
        )}
      </button>
    </article>
  );
};

export default CamperCard;