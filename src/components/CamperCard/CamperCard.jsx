import styles from "./CamperCard.module.css";
import { NavLink } from "react-router-dom";
import {
  BsWind,
  BsCupHot,
  BsTv,
  BsDroplet,
  BsMap,
  BsStarFill,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";
import { BsDiagram3, BsFuelPump, BsBroadcastPin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/favoritesSlice";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(camper.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const features = [
    camper.transmission === "automatic" && {
      name: "Automatic",
      icon: <BsDiagram3 aria-hidden="true" />,
    },
    camper.AC && { name: "AC", icon: <BsWind aria-hidden="true" /> },
    camper.engine === "petrol" && {
      name: "Petrol",
      icon: <BsFuelPump aria-hidden="true" />,
    },
    camper.kitchen && { name: "Kitchen", icon: <BsCupHot aria-hidden="true" /> },
    camper.radio && {
      name: "Radio",
      icon: <BsBroadcastPin aria-hidden="true" />,
    },
    camper.bathroom && {
      name: "Bathroom",
      icon: <BsDroplet aria-hidden="true" />,
    },
    camper.TV && { name: "TV", icon: <BsTv aria-hidden="true" /> },
  ].filter(Boolean);

  return (
    <div className={styles.camperCard}>
      {camper.gallery && camper.gallery.length > 0 && (
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={styles.image}
        />
      )}

      <button
        type="button"
        className={styles.favoriteIcon}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <BsHeartFill className={styles.filledHeart} aria-hidden="true" />
        ) : (
          <BsHeart className={styles.heart} aria-hidden="true" />
        )}
      </button>

      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h3 className={styles.camperName}>{camper.name}</h3>
          <div className={styles.price}>
            €{camper.price.toFixed(2).replace(".", ",")}
          </div>
        </div>

        <div className={styles.locationAndRating}>
          {typeof camper.rating === "number" && (
            <div className={styles.rating}>
              <BsStarFill className={styles.starIcon} aria-hidden="true" />
              <span className={styles.ratingValue}>
                {camper.rating.toFixed(1)}
              </span>
              <span className={styles.reviewCount}>
                ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
          )}

          <p className={styles.location}>
            <BsMap aria-hidden="true" /> {camper.location}
          </p>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.features} role="list">
          {features.map((feature) => (
            <li key={feature.name} className={styles.feature}>
              {feature.icon}
              <span className={styles.featureName}>{feature.name}</span>
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
  );
};

export default CamperCard;
