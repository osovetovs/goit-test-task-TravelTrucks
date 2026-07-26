import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.notFound}>
      <section className={styles.card}>
        <p className={styles.errorCode}>404</p>

        <div className={styles.content}>
          <h1 className={styles.title}>Page not found</h1>

          <p className={styles.description}>
            The page you are looking for doesn&apos;t exist or may
            have been moved.
          </p>
        </div>

        <div className={styles.actions}>
          <Link className={styles.homeButton} to="/">
            Back to home
          </Link>

          <Link className={styles.catalogButton} to="/catalog">
            View catalog
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;