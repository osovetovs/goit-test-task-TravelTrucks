import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { BsMap, BsStarFill } from "react-icons/bs";

import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../../components/Loader/Loader";

import styles from "./Camper.module.css";

const API = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "€0,00";
  }

  return `€${numericPrice.toFixed(2).replace(".", ",")}`;
};

const Camper = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
      setSelectedImageIndex(0);

      try {
        const response = await axios.get(`${API}/${id}`);
        setCamper(response.data);
      } catch (requestError) {
        setCamper(null);

        if (requestError.response?.status === 404) {
          setError("Camper not found.");
        } else {
          setError("Unable to load camper details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  useEffect(() => {
    if (camper && location.pathname === `/catalog/${id}`) {
      navigate("features", { replace: true });
    }
  }, [camper, id, location.pathname, navigate]);

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

  return (
    <main className={styles.camperContainer}>
      <section className={styles.overview}>
        <div className={styles.galleryColumn}>
          {selectedImage ? (
            <img
              className={styles.mainImage}
              src={selectedImage}
              alt={`${camper.name} main view`}
            />
          ) : (
            <div className={styles.imagePlaceholder}>No image available</div>
          )}

          {gallery.length > 0 && (
            <div className={styles.thumbnailList}>
              {gallery.map((image, index) => {
                const thumbnailSource = image.thumb || image.original;
                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={`${thumbnailSource}-${index}`}
                    type="button"
                    className={`${styles.thumbnailButton} ${
                      isActive ? styles.activeThumbnail : ""
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

        <article className={styles.summaryCard}>
          <h1 className={styles.camperName}>{camper.name}</h1>

          <div className={styles.meta}>
            <div className={styles.rating}>
              <BsStarFill className={styles.starIcon} aria-hidden="true" />

              <span>{Number(camper.rating || 0).toFixed(1)}</span>

              <span>
                ({camper.reviews?.length || 0}{" "}
                {camper.reviews?.length === 1 ? "Review" : "Reviews"})
              </span>
            </div>

            <p className={styles.location}>
              <BsMap aria-hidden="true" />
              {camper.location}
            </p>
          </div>

          <p className={styles.price}>{formatPrice(camper.price)}</p>

          <p className={styles.description}>{camper.description}</p>
        </article>
      </section>

      <nav className={styles.tabs} aria-label="Camper information">
        <Link
          to="features"
          className={`${styles.tabButton} ${
            location.pathname.includes("/features") ? styles.activeTab : ""
          }`}
        >
          Features
        </Link>

        <Link
          to="reviews"
          className={`${styles.tabButton} ${
            location.pathname.includes("/reviews") ? styles.activeTab : ""
          }`}
        >
          Reviews
        </Link>
      </nav>

      <div className={styles.divider} />

      <section className={styles.featuresAndBooking}>
        <div className={styles.outletContent}>
          <Outlet context={{ camper }} />
        </div>

        <BookingForm camperId={id} />
      </section>
    </main>
  );
};

export default Camper;