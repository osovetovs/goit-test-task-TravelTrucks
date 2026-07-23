import { BsStarFill } from "react-icons/bs";

import styles from "./Reviews.module.css";

const Reviews = ({ camper }) => {
  const reviews = Array.isArray(camper?.reviews)
    ? camper.reviews
    : [];

  if (reviews.length === 0) {
    return (
      <p className={styles.emptyReviews}>
        No reviews available.
      </p>
    );
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map((review, reviewIndex) => {
        const reviewerRating = Math.min(
          5,
          Math.max(0, Math.round(Number(review.reviewer_rating) || 0)),
        );

        return (
          <li
            key={`${review.reviewer_name}-${reviewIndex}`}
            className={styles.review}
          >
            <div className={styles.header}>
              <div
                className={styles.avatarContainer}
                aria-hidden="true"
              >
                {review.reviewer_name?.[0]?.toUpperCase() || "?"}
              </div>

              <div className={styles.info}>
                <h3 className={styles.reviewerName}>
                  {review.reviewer_name}
                </h3>

                <div
                  className={styles.rating}
                  aria-label={`${reviewerRating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <BsStarFill
                      key={starIndex}
                      className={
                        starIndex < reviewerRating
                          ? styles.filledStar
                          : styles.emptyStar
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className={styles.comment}>
              {review.comment}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;