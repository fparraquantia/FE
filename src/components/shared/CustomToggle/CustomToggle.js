import React from "react";
import styles from "./CustomToggle.module.scss"; // Asegúrate de tener este archivo CSS

export default function CustomToggle({ isActive, setIsActive }) {
  const handleToggleChange = (event) => {
    setIsActive(event.target.checked);
  };

  return (
    <div className={styles.toggle}>
      {/* Añade el evento onChange al input y establece su valor checked basado en isActive */}
      <input
        type="checkbox"
        name="switch"
        id="switch"
        checked={isActive}
        onChange={handleToggleChange}
      />
      <label htmlFor="switch" />
    </div>
  );
}
