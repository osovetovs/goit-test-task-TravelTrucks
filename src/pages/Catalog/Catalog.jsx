import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";

import closeIcon from "../../assets/icons/ion_close.svg";
import noCampersImage from "../../assets/no-campers.png";

import {
  fetchCampers,
  fetchFilteredCampers,
  loadMore,
} from "../../store/campersSlice";

import { resetFilters } from "../../store/filterSlice";

import styles from "./Catalog.module.css";

const mapFiltersToApiParams = (filters) => {
  const params = {};

  const location = filters.location.trim();

  if (location) {
    params.location = location;
  }

  if (filters.form) {
    params.form = filters.form;
  }

  if (filters.engine) {
    params.engine = filters.engine;
  }

  if (filters.transmission) {
    params.transmission = filters.transmission;
  }

  return params;
};

const hasAnyFilter = (filters) => {
  if (!filters) {
    return false;
  }

  return Boolean(
    filters.location.trim() ||
    filters.form ||
    filters.engine ||
    filters.transmission
  );
};

const Catalog = () => {
  const dispatch = useDispatch();

  const { campers, status, page, error, hasMore } = useSelector(
    (state) => state.campers
  );

  const [activeFilters, setActiveFilters] = useState(null);

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchCampers(1));
  }, [dispatch]);

  const uniqueCampers = useMemo(() => {
    const campersById = new Map();

    campers.forEach((camper) => {
      campersById.set(String(camper.id), camper);
    });

    return Array.from(campersById.values());
  }, [campers]);

  const showAllCampers = () => {
    dispatch(resetFilters());

    setActiveFilters(null);

    dispatch(fetchCampers(1));
  };

  const handleSearch = (filters) => {
    const filtering = hasAnyFilter(filters);

    if (!filtering) {
      setActiveFilters(null);
      dispatch(fetchCampers(1));
      return;
    }

    const apiParams = mapFiltersToApiParams(filters);

    setActiveFilters(apiParams);

    dispatch(
      fetchFilteredCampers({
        filters: apiParams,
        page: 1,
      })
    );
  };

  const handleLoadMore = () => {
    if (isLoading || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    dispatch(loadMore());

    if (activeFilters) {
      dispatch(
        fetchFilteredCampers({
          filters: activeFilters,
          page: nextPage,
        })
      );

      return;
    }

    dispatch(fetchCampers(nextPage));
  };

  const renderContent = () => {
    if (
      status === "failed" &&
      uniqueCampers.length === 0
    ) {
      return (
        <div className={styles.errorMessage}>
          <h2 className={styles.errorTitle}>
            Something went wrong
          </h2>

          <p className={styles.errorDescription}>
            {error || "We could not load the camper catalog."}
          </p>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={showAllCampers}
          >
            Try again
          </button>
        </div>
      );
    }

    if (
      status === "succeeded" &&
      uniqueCampers.length === 0
    ) {
      return (
        <div className={styles.noResults}>
          <img
            className={styles.noResultsImage}
            src={noCampersImage}
            alt=""
            aria-hidden="true"
          />

          <h2 className={styles.noResultsTitle}>
            No campers found
          </h2>

          <p className={styles.noResultsDescription}>
            We couldn’t find any campers that match your filters.
            <br />
            Try adjusting your search or clearing some filters.
          </p>

          <div className={styles.noResultsActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={showAllCampers}
            >
              <img
                className={styles.closeIcon}
                src={closeIcon}
                alt=""
                aria-hidden="true"
              />

              Clear filters
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={showAllCampers}
            >
              View all campers
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <ul className={styles.camperList}>
          {uniqueCampers.map((camper) => (
            <li
              key={camper.id}
              className={styles.camperListItem}
            >
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>

        {status === "failed" &&
          uniqueCampers.length > 0 && (
            <div className={styles.inlineError}>
              {error || "Could not load more campers."}
            </div>
          )}

        {hasMore && uniqueCampers.length > 0 && (
          <button
            type="button"
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            Load more
          </button>
        )}
      </>
    );
  };

  return (
    <main
      className={styles.catalogContainer}
      aria-busy={isLoading}
    >
      <Sidebar onSearch={handleSearch} />

      <section
        className={styles.camperListWrapper}
        aria-label="Camper search results"
      >
        {renderContent()}
      </section>

      {isLoading && <Loader />}
    </main>
  );
};

export default Catalog;