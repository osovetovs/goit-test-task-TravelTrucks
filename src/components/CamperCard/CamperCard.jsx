import { NavLink } from "react-router-dom";

import camperFormIcon from "../../assets/icons/camper-card/camper-form.svg";
import fuelIcon from "../../assets/icons/camper-card/fuel.svg";
import mapIcon from "../../assets/icons/camper-card/map.svg";
import starIcon from "../../assets/icons/camper-card/star.svg";
import transmissionIcon from "../../assets/icons/camper-card/transmission.svg";

import styles from "./CamperCard.module.css";

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "€0";
  }

  return `€${numericPrice}`;
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

const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating)) {
    return "0";
  }

  return numericRating.toFixed(1).replace(/\.0$/, "");
};

const formatLocation = (location) => {
  if (!location) {
    return "";
  }

  const locationParts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (locationParts.length !== 2) {
    return location;
  }

  const [country, city] = locationParts;

  return `${city}, ${country}`;
};

const CamperCard = ({ camper }) => {
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
      icon: fuelIcon,
    },
    camper.transmission && {
      name: capitalize(camper.transmission),
      icon: transmissionIcon,
    },
    camper.form && {
      name: formatForm(camper.form),
      icon: camperFormIcon,
    },
  ].filter(Boolean);

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
              <h2 className={styles.camperName}>
                {camper.name}
              </h2>

              <p className={styles.price}>
                {formatPrice(camper.price)}
              </p>
            </div>

            <div className={styles.locationAndRating}>
              <div className={styles.rating}>
                <img
                  className={styles.starIcon}
                  src={starIcon}
                  alt=""
                  aria-hidden="true"
                />

                <span>
                  {formatRating(camper.rating)}
                  ({reviewsCount} Reviews)
                </span>
              </div>

              <p className={styles.location}>
                <img
                  className={styles.locationIcon}
                  src={mapIcon}
                  alt=""
                  aria-hidden="true"
                />

                <span>{formatLocation(camper.location)}</span>
              </p>
            </div>
          </div>

          <p className={styles.description}>
            {camper.description}
          </p>

          <ul className={styles.features}>
            {filterValues.map(({ name, icon }) => (
              <li key={name} className={styles.feature}>
                <img
                  className={styles.featureIcon}
                  src={icon}
                  alt=""
                  aria-hidden="true"
                />

                <span className={styles.featureName}>
                  {name}
                </span>
              </li>
            ))}
          </ul>

          <NavLink
            to={`/catalog/${camper.id}`}
            className={styles.button}
          >
            Show more
          </NavLink>
        </div>
      </div>
    </article>
  );
};

export default CamperCard;