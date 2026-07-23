import { useDispatch, useSelector } from "react-redux";
import { BsMap, BsX } from "react-icons/bs";

import {
  resetFilters,
  setLocation,
  setVehicleType,
  toggleFilter,
} from "../../store/filterSlice";

import styles from "./Sidebar.module.css";

const EMPTY_FILTERS = {
  location: "",
  AC: false,
  Automatic: false,
  Kitchen: false,
  TV: false,
  Bathroom: false,
  vehicleType: "",
};

const equipmentOptions = [
  "AC",
  "Automatic",
  "Kitchen",
  "TV",
  "Bathroom",
];

const vehicleTypes = [
  {
    name: "Van",
    value: "panel truck",
  },
  {
    name: "Fully Integrated",
    value: "fully integrated",
  },
  {
    name: "Alcove",
    value: "alcove",
  },
];

const Sidebar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  const handleEquipmentChange = (name) => {
    dispatch(toggleFilter(name));
  };

  const handleVehicleTypeChange = (value) => {
    dispatch(setVehicleType(value));
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
        <legend className={styles.groupTitle}>Vehicle Equipment</legend>

        <div className={styles.options}>
          {equipmentOptions.map((name) => (
            <label className={styles.option} key={name}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={filters[name]}
                onChange={() => handleEquipmentChange(name)}
              />

              <span>{name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend className={styles.groupTitle}>Vehicle Type</legend>

        <div className={styles.options}>
          {vehicleTypes.map(({ name, value }) => (
            <label className={styles.option} key={value}>
              <input
                className={styles.radio}
                type="radio"
                name="vehicleType"
                checked={filters.vehicleType === value}
                onChange={() => handleVehicleTypeChange(value)}
              />

              <span>{name}</span>
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