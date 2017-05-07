import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
// import history from '../../core/history';
import $ from "jquery";
// import Sidebar from '../Sidebar';

function Header() {
  return (
    <div id="wrapper" className="content">
      <Navbar fluid={true}  style={ {margin: 0} }>
          <Brand>
            <span>
             {//<img src="../../assets/graphics/logo.png"/>
            }
              <span>&nbsp; DuperSet</span>
                <button type="button" className="navbar-toggle" onClick={() => {toggleMenu();}} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">

           <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id = 'navDropdown4'>
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

          </ul>
    </Navbar>
    </div>
  );
}
function toggleMenu(){
    if($(".navbar-collapse").hasClass('collapse')){
      $(".navbar-collapse").removeClass('collapse');
    }
    else{
      $(".navbar-collapse").addClass('collapse');
    }
  }

export default Header;
