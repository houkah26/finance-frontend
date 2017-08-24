import React from "react";
import { startCase } from "lodash";
import { Dropdown, Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

const NavDropdown = ({ itemsToRender, activeItem, className, header }) =>
  <Menu className={"nav-dropdown " + className}>
    <Dropdown text={startCase(activeItem)} pointing className={"link item"}>
      <Dropdown.Menu>
        {itemsToRender.map(item =>
          <Dropdown.Item
            text={item.content}
            onClick={() => item.onClick(item.route)}
            active={activeItem === item.route}
            key={item.route || item.content}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item header position="right">
      {header}
    </Menu.Item>
  </Menu>;

NavDropdown.propTypes = {
  activeItem: PropTypes.string.isRequired,
  itemsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      route: PropTypes.string,
      onClick: PropTypes.func,
      position: PropTypes.oneOf(["right"])
    })
  ),
  className: PropTypes.string,
  header: PropTypes.string
};

export default NavDropdown;
