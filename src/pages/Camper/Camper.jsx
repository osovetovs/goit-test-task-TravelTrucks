import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import styles from "./Camper.module.css";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import { BsStarFill, BsMap } from "react-icons/bs";

const Camper = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamper = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        setCamper(response.data);
      } catch (error) {
        console.error("Error fetching camper data:", error);
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
  }, [camper, location.pathname, id, navigate]);

  if (loading) return <Loader />;
  if (!camper) return <p>Camper not found.</p>;

  return (
    <div className={styles.camperContainer}>
      <div className={styles.header}>
        <h1 className={styles.camperName}>{camper.name}</h1>
        <div className={styles.rating}>
          <BsStarFill className={styles.starIcon} />
          <span className={styles.ratingValue}>{camper.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>
            ({camper.reviews.length} Reviews)
          </span>
          <span className={styles.location}>
            <BsMap />
            {camper.location}
          </span>
        </div>
        <p className={styles.price}>
          €{camper.price.toFixed(2).replace(".", ",")}
        </p>
      </div>

      <div className={styles.gallery}>
        {camper.gallery && camper.gallery.length > 0 ? (
          camper.gallery.map((image, index) => (
            <img
              key={index}
              src={image.original}
              alt={`${camper.name} image ${index + 1}`}
              className={styles.image}
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <Link
          to="features"
          className={`${styles.tabButton} ${
            location.pathname.includes("features") ? styles.activeTab : ""
          }`}
        >
          Features
        </Link>
        <Link
          to="reviews"
          className={`${styles.tabButton} ${
            location.pathname.includes("reviews") ? styles.activeTab : ""
          }`}
        >
          Reviews
        </Link>
      </div>

      <svg className={styles.svgLine}>
        <use href="../../assets/divider.svg" />
      </svg>

      <div className={styles.featuresAndBooking}>
        <div className={styles.features}>
          <Outlet context={{ camper }} />
        </div>

        <BookingForm camperId={id} />
      </div>
    </div>
  );
};

export default Camper;
