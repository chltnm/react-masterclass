import { useState } from "react";
import styled from "styled-components";
import styles from "../Toggle.module.css";

interface IToggle {
  isToggled: boolean;
  onToggle: any;
}
const ToggleWrap = styled.div``;
const Toggle = ({ isToggled, onToggle }: IToggle) => {
  return (
    <ToggleWrap>
      <span className={styles.toggleName}>Light/Dark</span>

      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isToggled}
          onChange={onToggle}
          name="toggleCheckbox"
          className={styles.toggleCheckbox}
        />
        <span className={styles.slider} />
      </label>
    </ToggleWrap>
  );
};

export default Toggle;
