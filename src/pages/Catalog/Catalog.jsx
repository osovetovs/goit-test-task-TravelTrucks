import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  fetchFilteredCampers,
  loadMore,
} from "../../store/campersSlice";
import Sidebar from "../../components/Sidebar/Sidebar";
import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Catalog.module.css";

const mapFiltersToApiParams = (filters) => {
  const params = {};

  if (filters.location) params.location = filters.location;

  if (filters.AC) params.AC = true;
  if (filters.Kitchen) params.kitchen = true;
  if (filters.TV) params.TV = true;
  if (filters.Bathroom) params.bathroom = true;

  if (filters.Automatic) params.transmission = "automatic";

  if (filters.vehicleType) params.form = filters.vehicleType;

  return params;
};

const hasAnyFilter = (filters) => {
  if (!filters) return false;
  return Boolean(
    filters.location ||
    filters.AC ||
    filters.Automatic ||
    filters.Kitchen ||
    filters.TV ||
    filters.Bathroom ||
    filters.vehicleType
  );
};

const Catalog = () => {
  const dispatch = useDispatch();
  const { campers, status, page, error } = useSelector(
    (state) => state.campers
  );

  const [filteredCampers, setFilteredCampers] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchCampers(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (!isFiltering && campers.length > 0) {
      setFilteredCampers((prev) => [...prev, ...campers]);
    }
  }, [campers, isFiltering]);

  const visibleCampers = useMemo(() => {
    return filteredCampers.slice(0, displayCount);
  }, [filteredCampers, displayCount]);

  const handleSearch = async (filters) => {
    const filtering = hasAnyFilter(filters);

    setDisplayCount(4);

    if (!filtering) {
      setIsFiltering(false);
      setFilteredCampers([...campers]);
      return;
    }

    setIsFiltering(true);

    const apiParams = mapFiltersToApiParams(filters);
    const action = await dispatch(fetchFilteredCampers(apiParams));

    if (fetchFilteredCampers.fulfilled.match(action)) {
      const items = Array.isArray(action.payload)
        ? action.payload
        : (action.payload?.items ?? []);
      setFilteredCampers(items);
    } else {
      setFilteredCampers([]);
    }
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setDisplayCount((prev) => prev + 4);

    if (!isFiltering) {
      dispatch(loadMore());
    }
  };

  const renderContent = () => {
    if (
      status === "loading" &&
      campers.length === 0 &&
      filteredCampers.length === 0
    ) {
      return <Loader />;
    }

    if (status === "failed") {
      return (
        <div className={styles.errorMessage}>
          Error: {error || "An unknown error occurred."}
        </div>
      );
    }

    if (filteredCampers.length === 0) {
      return (
        <div className={styles.noResults}>
          No campers found matching your criteria.
        </div>
      );
    }

    return (
      <>
        <ul className={styles.camperList} role="list">
          {visibleCampers.map((camper) => (
            <li key={camper.id} className={styles.camperListItem}>
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>

        {filteredCampers.length > displayCount && (
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load more
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.catalogContainer}>
      <Sidebar onSearch={handleSearch} />
      <div className={styles.camperListWrapper}>{renderContent()}</div>
    </div>
  );
};

export default Catalog;
