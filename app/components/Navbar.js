import React from 'react';
import { connect } from 'react-redux'
import storage from 'electron-json-storage'

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
// import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import {Link} from 'react-router-dom'
import {clearCachedData} from '../utils/storageUtils'

function NavTop(props) {
  console.log("props in navbar are ", props)

  function loginNavBar(){
      
      props.auth.lock.show();

      props.auth.lock.on('authenticated', (authResult) => {
        storage.set('id_token', authResult.idToken);
        props.auth.lock.getProfile(authResult.idToken, (err, profile) => {
          console.log("profile is ", profile)
          var options = {
            id_token : authResult.idToken,
            api : 'firebase',
            scope : 'openid name email displayName',
            target: 'H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX'
          };
          props.auth.auth0.getDelegationToken(options, function(err, result) {
            console.log('err is ', err)
          if(!err) {
            console.log("result is ", result)
            // Exchange the delegate token for a Firebase auth token
            firebase.auth().signInWithCustomToken(result.id_token)
              .then(()=> firebase.database().ref('users').push(profile))
              .catch(function(error) {
              console.log(error);
            });
          }
        });
        storage.set('profile', JSON.stringify(profile));
        });
      
      });
         if (storage.get('id_token') && storage.get('profile')){
          var idToken = storage.get('id_token') || null;
          var profile = JSON.parse(storage.get('profile')) || null;
          console.log("profile on line 52 is ", profile)
          props.login(profile);
        }
             props.auth.lock.hide();

        console.log("storage is ", storage)
    }

    function logoutNavBar(){
        props.logout();
        storage.remove('profile');
        storage.remove('id_token');
      }
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
              <NavItem eventKey={2}><Link to="/explorer">Explorer</Link></NavItem>
              <NavItem eventKey={3}><Link to="/sqlab">SQLab</Link></NavItem>
              <NavItem eventKey={4}><Link to="/allCardsView">AllCards</Link></NavItem>
              <NavItem eventKey={4.5}><a onClick={loginNavBar}>Login</a></NavItem>
              <NavItem eventKey={4.5}><a onClick={logoutNavBar}>Logout</a></NavItem>
              <NavDropdown eventKey={5} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1} onSelect={clearCachedData}>Clear Cached Data</MenuItem>
                <MenuItem eventKey={5.2}>Another action</MenuItem>
                <MenuItem eventKey={5.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={6.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={6} title={<i className="fa fa-user fa-fw"></i> } id = 'basic-nav-dropdown'>
                  <MenuItem eventKey="1">
                    <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
                  </MenuItem>
                  <MenuItem eventKey="2">
                    <span><i className="fa fa-gear fa-fw"></i> Settings </span>
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

// ----------------------- Container -----------------------
import { login, logout } from '../reducers/auth.jsx'

const mapStateToProps = (state, ownProps) => {
  return {auth: state.auth};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      login: () => dispatch(login),
      logout: () => dispatch(logout)
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavTop);

