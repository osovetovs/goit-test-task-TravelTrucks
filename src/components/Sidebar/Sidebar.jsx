import { useDispatch, useSelector } from "react-redux";
import { BsMap, BsX } from "react-icons/bs";

import {
  resetFilters,
  setEngine,
  setForm,
  setLocation,
  setTransmission,
} from "../../store/filterSlice";

import styles from "./Sidebar.module.css";

const EMPTY_FILTERS = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

const camperForms = [
  {
    label: "Alcove",
    value: "alcove",
  },
  {
    label: "Panel Van",
    value: "panelTruck",
  },
  {
    label: "Integrated",
    value: "fullyIntegrated",
  },
  {
    label: "Semi Integrated",
    value: "semiIntegrated",
  },
];

const engines = [
  {
    label: "Diesel",
    value: "diesel",
  },
  {
    label: "Petrol",
    value: "petrol",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "Electric",
    value: "electric",
  },
];

const transmissions = [
  {
    label: "Automatic",
    value: "automatic",
  },
  {
    label: "Manual",
    value: "manual",
  },
];

const Sidebar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    dispatch(resetFilters());
    onSearch(EMPTY_FILTERS);
  };

  return (
    <form className={styles.sidebar} onSubmit={handleSearch}>
      <label className={styles.locationLabel}>
        <span className={styles.locationTitle}>Location</span>

        <span className={styles.inputContainer}>
          <BsMap className={styles.locationIcon} aria-hidden="true" />

          <input
            type="text"
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="City"
            className={styles.locationInput}
          />
        </span>
      </label>

      <p className={styles.filterTitle}>Filters</p>

      <fieldset className={styles.filterGroup}>
        <legend className={styles.groupTitle}>Camper form</legend>

        <div className={styles.options}>
          {camperForms.map(({ label, value }) => (
            <label className={styles.option} key={value}>
              <input
                className={styles.radio}
                type="radio"
                name="camperForm"
                value={value}
                checked={filters.form === value}
                onChange={() => dispatch(setForm(value))}
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend className={styles.groupTitle}>Engine</legend>

        <div className={styles.options}>
          {engines.map(({ label, value }) => (
            <label className={styles.option} key={value}>
              <input
                className={styles.radio}
                type="radio"
                name="engine"
                value={value}
                checked={filters.engine === value}
                onChange={() => dispatch(setEngine(value))}
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend className={styles.groupTitle}>Transmission</legend>

        <div className={styles.options}>
          {transmissions.map(({ label, value }) => (
            <label className={styles.option} key={value}>
              <input
                className={styles.radio}
                type="radio"
                name="transmission"
                value={value}
                checked={filters.transmission === value}
                onChange={() => dispatch(setTransmission(value))}
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <BsX aria-hidden="true" />
          Clear filters
        </button>
      </div>
    </form>
  );
};

export default Sidebar;