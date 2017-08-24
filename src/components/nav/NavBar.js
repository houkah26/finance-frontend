import React from "react";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

import NavBarMenuItem from "./NavBarMenuItem";

const NavBar = ({
  itemsToRender,
  activeItem,
  className,
  tabular = false,
  attached = null,
  stackable = false,
  inverted = false,
  size = null,
  collapsed = false
}) => {
  const collapsedClass = collapsed ? "collapse" : "";

  return (
    <Menu
      tabular={tabular}
      attached={attached}
      stackable={stackable}
      inverted={inverted}
      size={size}
      className={`nav-bar ${className} ${collapsedClass}`}
    >
      {itemsToRender.map(item =>
        <NavBarMenuItem
          {...item}
          onClick={
            typeof item.onClick === "function"
              ? () => item.onClick(item.route)
              : undefined
          }
          active={activeItem === item.route}
          key={item.route || item.content}
          collapsed={collapsed}
        />
      )}
    </Menu>
  );
};

NavBar.propTypes = {
  activeItem: PropTypes.string.isRequired,
  itemsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      route: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.oneOf([
          "mini",
          "tiny",
          "small",
          "large",
          "big",
          "huge",
          "massive"
        ])
      }),
      position: PropTypes.oneOf(["right"]),
      header: PropTypes.bool,
      collapsed: PropTypes.bool
    })
  ),
  className: PropTypes.string,
  tabular: PropTypes.bool,
  attached: PropTypes.oneOf(["top", "bottom"]),
  stackable: PropTypes.bool,
  inverted: PropTypes.bool,
  size: PropTypes.oneOf([
    "mini",
    "tiny",
    "small",
    "large",
    "big",
    "huge",
    "massive"
  ]),
  collapsed: PropTypes.bool
};

export default NavBar;
