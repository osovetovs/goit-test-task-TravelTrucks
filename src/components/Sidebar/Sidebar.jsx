import { useDispatch, useSelector } from "react-redux";
import {
  BsCupHot,
  BsDiagram3,
  BsDroplet,
  BsGrid,
  BsGrid1X2,
  BsGrid3X3Gap,
  BsMap,
  BsTv,
  BsWind,
  BsX,
} from "react-icons/bs";

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
  {
    name: "AC",
    icon: <BsWind aria-hidden="true" />,
  },
  {
    name: "Automatic",
    icon: <BsDiagram3 aria-hidden="true" />,
  },
  {
    name: "Kitchen",
    icon: <BsCupHot aria-hidden="true" />,
  },
  {
    name: "TV",
    icon: <BsTv aria-hidden="true" />,
  },
  {
    name: "Bathroom",
    icon: <BsDroplet aria-hidden="true" />,
  },
];

const vehicleTypes = [
  {
    name: "Van",
    value: "panel truck",
    icon: <BsGrid1X2 aria-hidden="true" />,
  },
  {
    name: "Fully Integrated",
    value: "fully integrated",
    icon: <BsGrid aria-hidden="true" />,
  },
  {
    name: "Alcove",
    value: "alcove",
    icon: <BsGrid3X3Gap aria-hidden="true" />,
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
          {equipmentOptions.map(({ name, icon }) => (
            <label className={styles.option} key={name}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={filters[name]}
                onChange={() => handleEquipmentChange(name)}
              />

              <span className={styles.optionIcon}>{icon}</span>
              <span>{name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend className={styles.groupTitle}>Vehicle Type</legend>

        <div className={styles.options}>
          {vehicleTypes.map(({ name, value, icon }) => (
            <label className={styles.option} key={value}>
              <input
                className={styles.radio}
                type="radio"
                name="vehicleType"
                checked={filters.vehicleType === value}
                onChange={() => handleVehicleTypeChange(value)}
              />

              <span className={styles.optionIcon}>{icon}</span>
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