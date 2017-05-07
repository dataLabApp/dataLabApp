import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
// import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import {Link} from 'react-router-dom'


function NavTop() {
  return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to ="/home">DuperSet</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="/dashboard">Dashboard</Link></NavItem>
              <NavItem eventKey={2}><Link to="/talktodb">Talk To Database</Link></NavItem>
              <NavItem eventKey={3}><Link to="/explorer">Explorer</Link></NavItem>
              <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}>Action</MenuItem>
                <MenuItem eventKey={4.2}>Another action</MenuItem>
                <MenuItem eventKey={4.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={4.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={5} title={<i className="fa fa-user fa-fw"></i> } id = 'basic-nav-dropdown'>
                  <MenuItem eventKey="1">
                    <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
                  </MenuItem>
                  <MenuItem eventKey="2">
                    <span><i className="fa fa-gear fa-fw"></i> Settings </span>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey = "3" href = 'http://www.strapui.com' >
                    <span> <i className = "fa fa-eye fa-fw" /> Premium React Themes </span>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey = "4">
                    <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
                  </MenuItem>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
  );
}

export default NavTop;
