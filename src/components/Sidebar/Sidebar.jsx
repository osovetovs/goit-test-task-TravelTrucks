import { useDispatch, useSelector } from "react-redux";
import { BsMap } from "react-icons/bs";

import closeIcon from "../../assets/icons/ion_close.svg";

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
      <div className={styles.info}>
        <label className={styles.locationLabel}>
          <span className={styles.locationTitle}>Location</span>

          <span className={styles.inputContainer}>
            <BsMap
              className={styles.locationIcon}
              aria-hidden="true"
            />

            <input
              type="text"
              value={filters.location}
              onChange={handleLocationChange}
              placeholder="City"
              className={styles.locationInput}
            />
          </span>
        </label>

        <div className={styles.filtersSection}>
          <h2 className={styles.filterTitle}>Filters</h2>

          <div className={styles.filterGroups}>
            <div
              className={styles.filterGroup}
              role="radiogroup"
              aria-labelledby="camper-form-title"
            >
              <p
                id="camper-form-title"
                className={styles.groupTitle}
              >
                Camper form
              </p>

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
            </div>

            <div
              className={styles.filterGroup}
              role="radiogroup"
              aria-labelledby="engine-title"
            >
              <p
                id="engine-title"
                className={styles.groupTitle}
              >
                Engine
              </p>

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
            </div>

            <div
              className={styles.filterGroup}
              role="radiogroup"
              aria-labelledby="transmission-title"
            >
              <p
                id="transmission-title"
                className={styles.groupTitle}
              >
                Transmission
              </p>

              <div className={styles.options}>
                {transmissions.map(({ label, value }) => (
                  <label className={styles.option} key={value}>
                    <input
                      className={styles.radio}
                      type="radio"
                      name="transmission"
                      value={value}
                      checked={filters.transmission === value}
                      onChange={() =>
                        dispatch(setTransmission(value))
                      }
                    />

                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <img
            className={styles.clearButtonIcon}
            src={closeIcon}
            alt=""
            aria-hidden="true"
          />

          Clear filters
        </button>
      </div>
    </form>
  );
};

export default Sidebar;