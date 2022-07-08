import React from "react";
import KeyboardInfo from "./keyboardEventsInfo";

function Header() {
  return (
    <div className="app-header">
      <div className="app-header__logo">
        <h1>
          <strong>Tombstone Builder</strong>
        </h1>
        <h2>Build your custom content loader</h2>
      </div>
      <div className="app-header__aside">
        <KeyboardInfo/>
      </div>
    </div>
  );
}

export default Header;
