const formatForm = (form) => {
  const forms = {
    alcove: "Alcove",
    panelTruck: "Panel truck",
    fullyIntegrated: "Fully integrated",
    semiIntegrated: "Semi integrated",
  };

  return forms[form] || form;
};

const capitalize = (value) => {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatMeasurement = (value, unit) => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const formattedValue = String(value).trim();

  if (formattedValue.toLowerCase().includes(unit.toLowerCase())) {
    return formattedValue;
  }

  return `${formattedValue} ${unit}`;
};

const formatConsumption = (value) => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const formattedValue = String(value).trim();

  if (formattedValue.toLowerCase().includes("/100km")) {
    return formattedValue;
  }

  return `${formattedValue} l / 100km`;
};

import styles from "./Features.module.css";

const Features = ({ camper }) => {
  if (!camper) {
    return null;
  }

  const featureBadges = [
    camper.transmission && capitalize(camper.transmission),
    camper.AC && "AC",
    camper.engine && capitalize(camper.engine),
    camper.kitchen && "Kitchen",
    camper.radio && "Radio",
    camper.TV && "TV",
    camper.bathroom && "Bathroom",
    camper.form && formatForm(camper.form),
  ].filter(Boolean);

  const vehicleDetails = [
    camper.form && {
      label: "Form",
      value: formatForm(camper.form),
    },
    camper.length && {
      label: "Length",
      value: formatMeasurement(camper.length, "m"),
    },
    camper.width && {
      label: "Width",
      value: formatMeasurement(camper.width, "m"),
    },
    camper.height && {
      label: "Height",
      value: formatMeasurement(camper.height, "m"),
    },
    camper.tank && {
      label: "Tank",
      value: formatMeasurement(camper.tank, "l"),
    },
    camper.consumption && {
      label: "Consumption",
      value: formatConsumption(camper.consumption),
    },
  ].filter(Boolean);

  return (
    <article className={styles.featuresContainer}>
      <h2 className={styles.title}>Vehicle details</h2>

      <ul className={styles.features} role="list">
        {featureBadges.map((feature) => (
          <li key={feature} className={styles.feature}>
            {feature}
          </li>
        ))}
      </ul>

      <div className={styles.divider} />

      <dl className={styles.detailsList}>
        {vehicleDetails.map((detail) => (
          <div key={detail.label} className={styles.detailItem}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

export default Features;