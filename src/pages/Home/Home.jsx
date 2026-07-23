import { Link } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Campers of your dreams</h1>

        <p className={styles.heroDescription}>
          You can find everything you want in our catalog
        </p>

        <Link className={styles.heroButton} to="/catalog">
          View Now
        </Link>
      </div>
    </main>
  );
};

export default Home;