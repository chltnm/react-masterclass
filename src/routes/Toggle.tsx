import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import styles from "./Toggle.module.css";

interface IToggle {}

const Toggle = ({}: IToggle) => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <span className={styles.emoji}>{isDark ? "🌙" : "☀️"}</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={toggleDarkAtom}
          name="toggleCheckbox"
          className={styles.toggleCheckbox}
        />
        <span className={styles.slider} />
      </label>
    </>
  );
};

export default Toggle;
