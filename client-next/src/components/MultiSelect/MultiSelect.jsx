import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelect.module.css";
import { getClassNames, punctualizeString } from "@/lib/utils/commonUtils";

const classNames = getClassNames(styles);

export default function MultiSelect({ selected, setSelected, options }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      setSelected((prev) => [...prev, option]);
    }
  };

  const handleDelete = (option) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const filteredOptions = options.filter((o) => !selected.includes(o));

  return (
    <div className={classNames("container")} ref={dropdownRef}>
      <div
        className={classNames("selectBox")}
        onClick={toggleDropdown}
        tabIndex={0}
      >
        {selected.map((item) => (
          <div key={item} className={classNames("chip")}>
            <span>{punctualizeString(item)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {open && (
        <div className={classNames("dropdown")}>
          {filteredOptions.length === 0 ? (
            <div className={classNames("option")}>No more options</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={classNames("option")}
                onClick={() => handleSelect(option)}
              >
                {punctualizeString(option)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
