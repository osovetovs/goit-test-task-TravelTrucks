import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  fetchCampers,
  fetchFilteredCampers,
  loadMore,
  resetCampers,
} from "../../store/campersSlice";

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

  const handleSearch = (filters) => {
    const filtering = hasAnyFilter(filters);

    dispatch(resetCampers());

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
    if (status === "loading" || !hasMore) {
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
    if (status === "loading" && uniqueCampers.length === 0) {
      return <Loader />;
    }

    if (status === "failed" && uniqueCampers.length === 0) {
      return (
        <div className={styles.errorMessage}>
          Error: {error || "An unknown error occurred."}
        </div>
      );
    }

    if (status === "succeeded" && uniqueCampers.length === 0) {
      return (
        <div className={styles.noResults}>
          No campers found matching your criteria.
        </div>
      );
    }

    return (
      <>
        <ul className={styles.camperList}>
          {uniqueCampers.map((camper) => (
            <li key={camper.id} className={styles.camperListItem}>
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>

        {status === "failed" && (
          <div className={styles.errorMessage}>
            Error: {error || "Could not load more campers."}
          </div>
        )}

        {hasMore && uniqueCampers.length > 0 && (
          <button
            type="button"
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Load more"}
          </button>
        )}
      </>
    );
  };

  return (
    <main className={styles.catalogContainer}>
      <Sidebar onSearch={handleSearch} />

      <section className={styles.camperListWrapper}>
        {renderContent()}
      </section>
    </main>
  );
};

export default Catalog;