import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const NavMenuItem = ({
  content = null,
  route = null,
  active = false,
  onClick = null,
  icon = null,
  position = null,
  header = false,
  collapsed = false
}) =>
  <Menu.Item
    name={route}
    active={active}
    onClick={onClick}
    position={position}
    header={header}
  >
    {icon && <Icon name={icon.name} size={icon.size} />}
    {content}
    {active &&
      collapsed &&
      <Icon name="content" size="large" className="nav-toggle" />}
  </Menu.Item>;

NavMenuItem.propTypes = {
  content: PropTypes.string,
  route: PropTypes.string,
  active: PropTypes.bool,
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
};

export default NavMenuItem;
