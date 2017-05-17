import React from 'react';
import { connect } from 'react-redux'
// import storage from 'electron-json-storage'


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
  let logInOrOutLabel;
  props.auth.owner ? logInOrOutLabel = 'Logout' : logInOrOutLabel = 'Login';
  function logInOrOut(){
    props.auth.owner ? logoutNavBar() : loginNavBar();
  }
  function loginNavBar(){
    // let profile;
    // let idToken;

    props.auth.lock.show();

    props.auth.lock.on('authenticated', (authResult) => {
      // storage.set('id_token', authResult.idToken);
      // idToken = authResult.idToken
      props.auth.lock.getProfile(authResult.idToken, (err, profile) => {
        var options = {
          id_token : authResult.idToken,
          api : 'firebase',
          scope : 'openid name email displayName',
          target: 'H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX'
        };
        props.auth.auth0.getDelegationToken(options, function(err, result) {
          if (!err) {
            // Exchange the delegate token for a Firebase auth token
            // firebase.auth().signInWithCustomToken(result.id_token)
            // .then(() => firebase.database().ref('users').orderByKey().once('value'))
            // .then(snapshot => {
            //   let profileExists = false
            //   snapshot.forEach(x => {
            //     if (x.val().email === profile.email) profileExists = true
            //   })
            //   if (!profileExists) {
            //     firebase.database().ref('users').push(profile)
            //     console.log('******Just created profile in firebase: ', profile)
            //   }
            // })
            // .then(() => props.login(profile, authResult.idToken))
            // .catch(function(error) {
            //   console.log(error)
            // })

            // Exchange the delegate token for a Firebase auth token
            firebase.auth().signInWithCustomToken(result.id_token)
            .then(() => firebase.database().ref('users').push(profile))
            .then(() => props.login(profile, authResult.idToken))
            .catch(function(error) {
              console.log(error)
            })
          } else {
            console.log('err is ', err)
          }
        })
      // storage.set('profile', JSON.stringify(profile));
      })
      props.auth.lock.hide()
    })
          // console.log("profile on line 55 is ", profile)
          // if (profile) props.login(profile, idToken);
      // console.log("storage is ", storage)
  }


    function logoutNavBar(){
        props.logout();

        // storage.remove('profile');
        // storage.remove('id_token');
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
                    <span><a onClick = {logInOrOut}><i className = "fa fa-sign-out fa-fw" />{logInOrOutLabel}</a></span>
                  </MenuItem>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
  );
}

// ----------------------- Container -----------------------
import { login, logout } from '../reducers/authReducer.jsx'

const mapStateToProps = (state, ownProps) => {
  return {auth: state.auth};
}

const mapDispatchToProps = (dispatch) =>({
    login: (profile, idToken) => {
        dispatch(login(profile, idToken));
    },
    logout: () => {dispatch(logout())}
})


export default connect(mapStateToProps, mapDispatchToProps)(NavTop);

