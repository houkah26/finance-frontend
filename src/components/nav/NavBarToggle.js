import React from "react";

const NavBarToggle = ({ collapsed, toggleCollapse }) => {
  const iconType = collapsed ? "content" : "close";

  return (
    <i
      onClick={toggleCollapse}
      aria-hidden={true}
      className={`${iconType} large icon nav-toggle`}
    />
  );
};

export default NavBarToggle;
