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
import {Link} from 'react-router-dom'


function Header() {
  return (
        <div id="wrapper" className="content">
      <Navbar fluid={true}  style={ {margin: 0} }>
          <Brand>
            <span>
              <span>&nbsp;SB Admin React - </span>
                <a href="http://startreact.com/" title="Start React" rel="home">StartReact.com</a>
                <button type="button" className="navbar-toggle" onClick={() => {toggleMenu();}} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">

              <NavDropdown bsClass="dropdown" title={<span><i className="fa fa-envelope fa-fw"></i></span>} id="navDropdown1">
                <MenuItem style={ {width: 300} } eventKey="1">
                  <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                  <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2">
                  <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3">
                  <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4" className="text-center">
                  <strong>Read All Messages</strong> <i className="fa fa-angle-right"></i>
                </MenuItem>
              </NavDropdown>

                   <NavDropdown title={<i className="fa fa-bell fa-fw"></i>} id = 'navDropdown3'>
                  <MenuItem eventKey="1" style={ {width: 300} }>
                    <div> <i className="fa fa-comment fa-fw"></i> New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">
                    <div> <i className="fa fa-twitter fa-fw"></i> 3 New Followers <span className="pull-right text-muted small">12 minutes ago</span> </div>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3">
                    <div> <i className="fa fa-envelope fa-fw"></i> Message Sent <span className="pull-right text-muted small">4 minutes ago</span> </div>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">
                    <div> <i className="fa fa-tasks fa-fw"></i> New Task <span className="pull-right text-muted small">4 minutes ago</span> </div>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="5">
                    <div> <i className="fa fa-upload fa-fw"></i> Server Rebooted <span className="pull-right text-muted small">4 minutes ago</span> </div>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="6">
                    <strong>See All Alerts</strong> <i className="fa fa-angle-right"></i>
                  </MenuItem>
                </NavDropdown>

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
                  <MenuItem eventKey = "4" onClick = {(event) => { history.push('/login');}}>
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

    // <div id="wrapper" className="content">
    //   <Navbar fluid={true}  style={ {margin: 0} }>
    //       <Brand>
    //         <span>
    //          {//<img src="../../assets/graphics/logo.png"/>
    //         }
    //           <span>&nbsp; DuperSet</span>
    //             <button type="button" className="navbar-toggle" onClick={() => {toggleMenu();}} style={{position: 'absolute', right: 0, top: 0}}>
    //               <span className="sr-only">Toggle navigation</span>
    //               <span className="icon-bar"></span>
    //               <span className="icon-bar"></span>
    //               <span className="icon-bar"></span>
    //             </button> 
    //         </span>
    //       </Brand>
    //       {
    //       // <ul className="nav navbar-nav">
    //       //   <li><Link to='/dashboard'>Dashboard</Link></li>
    //       //   <li><Link to='/talktodb'>Talk To Database</Link></li>
    //       //   <li><Link to='/explorer'>Explorer</Link></li>
    //       // </ul>
    //     }
    //       <Navbar.Collapse>
    //         <Nav pullRight>
    //             <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id = 'navDropdown4'>
    //               <MenuItem eventKey="1">
    //                 <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
    //               </MenuItem>
    //               <MenuItem eventKey="2">
    //                 <span><i className="fa fa-gear fa-fw"></i> Settings </span>
    //               </MenuItem>
    //               <MenuItem divider />
    //               <MenuItem eventKey = "3" href = 'http://www.strapui.com' >
    //                 <span> <i className = "fa fa-eye fa-fw" /> Premium React Themes </span>
    //               </MenuItem>
    //               <MenuItem divider />
    //               <MenuItem eventKey = "4">
    //                 <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
    //               </MenuItem>
    //             </NavDropdown>
    //         </Nav>
    //         <Nav>
    //           <NavItem eventKey={1} href="./Dashboard">Dashboard</NavItem>
    //           <NavItem eventKey={2} href="#">Link</NavItem>
    //           <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    //             <MenuItem eventKey={3.1}>Action</MenuItem>
    //             <MenuItem eventKey={3.2}>Another action</MenuItem>
    //             <MenuItem eventKey={3.3}>Something else here</MenuItem>
    //             <MenuItem divider />
    //             <MenuItem eventKey={3.3}>Separated link</MenuItem>
    //           </NavDropdown>
    //         </Nav>
    //       </Navbar.Collapse>
    // </Navbar>
    // </div>