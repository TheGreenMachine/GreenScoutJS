import { useState } from "react";
import "./collapsibleDropdown.css";

function CollapsibleDropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function setOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="collapsibleDropdown">
      <button onClick={setOpen} className="collapsibleDropdown__trigger">
        <span>{title}</span>
        <span
          className={`collapsibleDropdown__arrow ${isOpen ? "collapsibleDropdown__arrow--open" : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`collapsibleDropdown__content ${isOpen ? "collapsibleDropdown__content--open" : ""}`}
      >
        <div className="collapsibleDropdown__inner">{children}</div>
      </div>
    </div>
  );
}

export default CollapsibleDropdown;
