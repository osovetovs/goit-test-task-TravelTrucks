import { useOutletContext } from "react-router-dom";
import styles from './Features.module.css';
import {
  BsDiagram3,
  BsWind,
  BsFuelPump,
  BsCupHot,
  BsBroadcastPin
} from 'react-icons/bs';

const Features = () => {
  const outletContext = useOutletContext();

  if (!outletContext || !outletContext.camper) {
    return <p>Loading features...</p>;
  }

  const { camper } = outletContext;

  const features = [
    camper.transmission === "automatic" && { name: "Automatic", icon: <BsDiagram3 /> },
    camper.AC && { name: "AC", icon: <BsWind /> },
    camper.engine === "petrol" && { name: "Petrol", icon: <BsFuelPump /> },
    camper.kitchen && { name: "Kitchen", icon: <BsCupHot /> },
    camper.radio && { name: "Radio", icon: <BsBroadcastPin /> },
  ].filter(Boolean);

  const vehicleDetails = [
    camper.form && { label: "Form", value: camper.form },
    camper.length && { label: "Length", value: `${camper.length} m` },
    camper.width && { label: "Width", value: `${camper.width} m` },
    camper.height && { label: "Height", value: `${camper.height} m` },
    camper.tank && { label: "Tank", value: `${camper.tank} l` },
    camper.consumption && { label: "Consumption", value: `${camper.consumption}/100km` },
  ].filter(Boolean);

  return (
    <div className={styles.featuresContainer}>
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            {feature.icon}
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      <div className={styles.vehicleDetails}>
        <h3>Vehicle details</h3>
        <svg className={styles.svgLine}>
          <use href="/assets/divider.svg" />
        </svg>
        <ul>
          {vehicleDetails.map((detail, index) => (
            <li key={index} className={styles.detailItem}>
              <span>{detail.label}</span>
              <span>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Features;
