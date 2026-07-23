import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay} aria-busy="true">
      <div
        className={styles.loaderCard}
        role="status"
        aria-live="polite"
      >
        <div className={styles.spinner} aria-hidden="true" />

        <div className={styles.textContainer}>
          <h2 className={styles.title}>Loading tracks...</h2>

          <p className={styles.description}>
            Please wait while we fetch the best
            <br />
            travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;