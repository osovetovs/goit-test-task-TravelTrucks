import { useSelector } from "react-redux";
import CamperCard from "../../components/CamperCard/CamperCard";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const campers = useSelector((state) => state.campers.campers);

  const favoriteCampers = campers.filter((camper) =>
    favoriteIds.includes(camper.id)
  );

  return (
    <div className={styles.container}>
      <h2>Your Favorite Campers</h2>
      {favoriteCampers.length > 0 ? (
        favoriteCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))
      ) : (
        <p>You havenot added any favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;
