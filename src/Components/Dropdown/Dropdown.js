import React, { useState } from "react";
import classes from "./Dropdown.module.css";
// import dropdownIcon from "../../Assets/Images and Icons/dropdown icon.png";
import { v4 } from "uuid";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [keyPressedValue, setKEyPressedValue] = useState("");
  const [optionsState, setOptionsState] = useState(props.options);

  // ref
  const dropdownRef = useRef(null);
  const dropdownItem = useRef(null);

  useEffect(() => {
    dropdownRef?.current?.focus();
  }, [isActive]);

  useEffect(() => {
    const removeDropdownHandler = (e) => {
      if (!dropdownRef?.current?.contains(e.target)) {
        setIsActive(false);
      } else {
      }
    };
    document.addEventListener("mousedown", removeDropdownHandler);

    return () => {
      document.removeEventListener("mousedown", removeDropdownHandler);
    };
  }, []);

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <div
        // tabIndex={0}
        className={classes.dropdownButton}
        onClick={() => {
          setIsActive(!isActive);
          document.getElementById("dropdownIcon").style =
            "transform: rotate(0deg)";
          // if (!isActive) {
          //   document.getElementById('dropdownIcon').style =
          //     'transform: rotate(-180deg)';
          // }
        }}
        tabIndex={0}
        onKeyDown={(event) => {
          setKEyPressedValue(event.key);
          const optionsCopy = props.options.filter((data) => {
            return data.toString().toLowerCase().charAt(0) === event.key;
          });
          setOptionsState(optionsCopy);
          if (event.key === "Backspace") {
            setOptionsState(props.options);
          }
        }}
      >
        {props.selected || props.title}
        <i>
          <FontAwesomeIcon
            icon={faAngleDown}
            color="#3C393A"
            id="dropdownIcon"
          />
        </i>
      </div>
      {isActive && (
        <div className={classes.dropdownContent} onClick={props.onClick}>
          {optionsState.length >= 1 ? (
            optionsState.map((option) => {
              return (
                <div
                  key={v4()}
                  className={classes.dropdownItem}
                  onClick={() => {
                    props.setSelected(option);
                    setIsActive(false);
                    document.getElementById("dropdownIcon").style =
                      "transform: rotate(0deg)";
                  }}
                  ref={dropdownItem}
                >
                  {option}
                </div>
              );
            })
          ) : (
            <p className={`${classes.dropdownItem2}`}>No matching Items</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
