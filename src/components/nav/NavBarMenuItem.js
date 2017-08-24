import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { startCase } from "lodash";
import PropTypes from "prop-types";

const NavMenuItem = ({
  name,
  active = false,
  onClick = null,
  icon = null,
  position = null,
  shouldRender = true,
  header = false,
  headerContent = null,
  collapsed = false
}) => {
  const collapsedClass = collapsed ? "collapse" : "";

  const renderIcon = () => {
    if (icon) {
      return <Icon name={icon.name} size={icon.size} />;
    }
  };

  const renderNavToggle = () => {
    if (active && collapsed) {
      return <Icon name="content" size="large" className="nav-toggle" />;
    }
  };

  if (header) {
    return (
      <Menu.Item header position={position} className={collapsedClass}>
        {headerContent}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item
      name={name}
      active={active}
      onClick={onClick}
      position={position}
      className={collapsedClass}
    >
      {renderIcon()}
      {startCase(name)}
      {renderNavToggle()}
    </Menu.Item>
  );
};

NavMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
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
  shouldRender: PropTypes.bool,
  header: PropTypes.bool,
  headerContent: PropTypes.string,
  collapsed: PropTypes.bool
};

export default NavMenuItem;
