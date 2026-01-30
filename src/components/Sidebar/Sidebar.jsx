import { useDispatch, useSelector } from "react-redux";
import {
  BsMap,
  BsWind,
  BsDiagram3,
  BsCupHot,
  BsTv,
  BsDroplet,
  BsGrid1X2,
  BsGrid,
  BsGrid3X3Gap,
} from "react-icons/bs";
import styles from "./Sidebar.module.css";
import {
  setLocation,
  toggleFilter,
  setVehicleType,
} from "../../store/filterSlice";

const Sidebar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleEquipmentChange = (name) => {
    dispatch(toggleFilter(name));
  };

  const handleVehicleTypeChange = (value) => {
    dispatch(setVehicleType(value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSearch} className={styles.sidebar}>
      <h3 className={styles.location}>Location</h3>

      <div className={styles.inputContainer}>
        <BsMap className={styles.icon} aria-hidden="true" />
        <input
          type="text"
          value={filters.location || ""}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className={styles.input}
        />
      </div>

      <p className={styles.filterTitle}>Filters</p>

      <h3 className={styles.heading}>Vehicle Equipment</h3>
      <svg className={styles.svgLine} aria-hidden="true">
        <use href="../../assets/divider.svg" />
      </svg>

      <div className={styles.equipmentOptions}>
        {[
          { name: "AC", icon: <BsWind aria-hidden="true" /> },
          { name: "Automatic", icon: <BsDiagram3 aria-hidden="true" /> },
          { name: "Kitchen", icon: <BsCupHot aria-hidden="true" /> },
          { name: "TV", icon: <BsTv aria-hidden="true" /> },
          { name: "Bathroom", icon: <BsDroplet aria-hidden="true" /> },
        ].map(({ name, icon }) => (
          <label
            key={name}
            className={`${styles.label} ${filters[name] ? styles.selected : ""}`}
          >
            <input
              type="checkbox"
              checked={!!filters[name]}
              onChange={() => handleEquipmentChange(name)}
            />
            <span className={styles.labelText}>
              {icon} {name}
            </span>
          </label>
        ))}
      </div>

      <h3 className={styles.heading}>Vehicle Type</h3>
      <svg className={styles.svgLine} aria-hidden="true">
        <use href="../../assets/divider.svg" />
      </svg>

      <div className={styles.vehicleTypes}>
        {[
          {
            name: "Van",
            icon: <BsGrid1X2 aria-hidden="true" />,
            value: "panel truck",
          },
          {
            name: "Fully Integrated",
            icon: <BsGrid aria-hidden="true" />,
            value: "fully integrated",
          },
          {
            name: "Alcove",
            icon: <BsGrid3X3Gap aria-hidden="true" />,
            value: "alcove",
          },
        ].map(({ name, icon, value }) => (
          <label
            key={value}
            className={`${styles.label} ${
              filters.vehicleType === value ? styles.selected : ""
            }`}
          >
            <input
              type="radio"
              checked={filters.vehicleType === value}
              onChange={() => handleVehicleTypeChange(value)}
            />
            <span className={styles.labelText}>
              {icon} {name}
            </span>
          </label>
        ))}
      </div>

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default Sidebar;
