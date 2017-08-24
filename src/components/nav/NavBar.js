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
}) =>
  <Menu
    tabular={tabular}
    attached={attached}
    stackable={stackable}
    inverted={inverted}
    size={size}
    className={"nav-bar " + className}
  >
    {itemsToRender.map(item =>
      <NavBarMenuItem
        {...item}
        active={activeItem === item.name}
        key={item.name}
        collapsed={collapsed}
        tabular
        attached
      />
    )}
  </Menu>;

NavBar.propTypes = {
  activeItem: PropTypes.string.isRequired,
  itemsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
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
      shouldRender: PropTypes.bool,
      header: PropTypes.bool,
      headerContent: PropTypes.string,
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
