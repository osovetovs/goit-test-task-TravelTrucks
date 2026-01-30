import { Link } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Campers of your dreams</h1>
        <p className={styles.title}>
          You can find everything you want in our catalog
        </p>
        <Link to="/catalog">
          <button className={styles.heroButton}>View Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
