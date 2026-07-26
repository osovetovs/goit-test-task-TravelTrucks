import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import BookingForm from "../../components/BookingForm/BookingForm";
import Features from "../../components/Features/Features";
import Loader from "../../components/Loader/Loader";
import Reviews from "../../components/Reviews/Reviews";

import mapIcon from "../../assets/icons/camper-card/map.svg";
import starIcon from "../../assets/icons/camper-card/star.svg";

import styles from "./Camper.module.css";

const API = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "€0";
  }

  return `€${numericPrice}`;
};

const formatLocation = (location) => {
  if (typeof location !== "string") {
    return "";
  }

  const locationParts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (locationParts.length < 2) {
    return location.trim();
  }

  const [country, ...cityParts] = locationParts;

  return `${cityParts.join(", ")}, ${country}`;
};

const Camper = () => {
  const { id } = useParams();

  const [camper, setCamper] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCamper = async () => {
      if (!id) {
        setError("Camper ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setCamper(null);
      setSelectedImageIndex(0);

      try {
        const response = await axios.get(`${API}/${id}`);

        setCamper(response.data);
      } catch (requestError) {
        if (requestError.response?.status === 404) {
          setError("The requested camper could not be found.");
        } else {
          setError("Unable to load camper details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!camper) {
    return (
      <main className={styles.errorState}>
        <h1 className={styles.errorTitle}>Camper unavailable</h1>

        <p className={styles.errorDescription}>{error}</p>

        <Link className={styles.backButton} to="/catalog">
          Back to catalog
        </Link>
      </main>
    );
  }

  const gallery = Array.isArray(camper.gallery) ? camper.gallery : [];

  const selectedImage =
    gallery[selectedImageIndex]?.original ||
    gallery[selectedImageIndex]?.thumb ||
    "";

  const reviewsCount = Array.isArray(camper.reviews)
    ? camper.reviews.length
    : 0;

  const formattedRating = Number(camper.rating || 0).toFixed(1);
  const isFirstImageSelected = selectedImageIndex === 0;

  return (
    <main className={styles.camperContainer}>
      <section className={styles.overview}>
        <div className={styles.galleryColumn}>
          {selectedImage ? (
            <div className={styles.mainImageFrame}>
              <img
                className={`${styles.mainImage} ${isFirstImageSelected
                    ? styles.firstMainImage
                    : styles.defaultMainImage
                  }`}
                src={selectedImage}
                alt={`${camper.name} main view`}
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              No image available
            </div>
          )}

          {gallery.length > 0 && (
            <div className={styles.thumbnailList}>
              {gallery.map((image, index) => {
                const thumbnailSource =
                  image.thumb || image.original || "";

                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={`${thumbnailSource}-${index}`}
                    type="button"
                    className={`${styles.thumbnailButton} ${isActive ? styles.activeThumbnail : ""
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Show ${camper.name} image ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    <img
                      className={styles.thumbnailImage}
                      src={thumbnailSource}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.detailsColumn}>
          <article className={styles.summaryCard}>
            <h1 className={styles.camperName}>{camper.name}</h1>

            <div className={styles.meta}>
              <div className={styles.rating}>
                <img
                  className={styles.starIcon}
                  src={starIcon}
                  alt=""
                  aria-hidden="true"
                />

                <span>
                  {formattedRating}({reviewsCount}{" "}
                  {reviewsCount === 1 ? "Review" : "Reviews"})
                </span>
              </div>

              <p className={styles.location}>
                <img
                  className={styles.mapIcon}
                  src={mapIcon}
                  alt=""
                  aria-hidden="true"
                />

                <span>{formatLocation(camper.location)}</span>
              </p>
            </div>

            <p className={styles.price}>{formatPrice(camper.price)}</p>

            <p className={styles.description}>{camper.description}</p>
          </article>

          <Features camper={camper} />
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Reviews</h2>

        <div className={styles.reviewsAndBooking}>
          <div className={styles.reviewsColumn}>
            <Reviews camper={camper} />
          </div>

          <div className={styles.bookingColumn}>
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Camper;