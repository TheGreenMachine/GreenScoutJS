import { useState } from "react";
import "./collapsibleDropdown.css";

function CollapsibleDropdown({ title, children, startOpen }) {
  const [isOpen, setIsOpen] = useState(startOpen || false);

  function setOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="collapsibleDropdown animated-border">
      <button onClick={setOpen} className="collapsibleDropdown__trigger">
        <span className="animated-text">{title}</span>
        <span
          className={`collapsibleDropdown__arrow ${isOpen ? "collapsibleDropdown__arrow--open" : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`collapsibleDropdown__content ${isOpen ? "collapsibleDropdown__content--open animated-border" : ""}`}
      >
        <div className="collapsibleDropdown__inner">{children}</div>
      </div>
    </div>
  );
}

export default CollapsibleDropdown;
