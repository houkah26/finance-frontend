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
            text={startCase(item.name)}
            onClick={item.onClick}
            active={activeItem === item.name}
            key={item.name}
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
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      position: PropTypes.oneOf(["right"])
    })
  ),
  className: PropTypes.string,
  header: PropTypes.string
};

export default NavDropdown;
