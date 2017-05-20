import React from 'react'
import { connect } from 'react-redux'
// import storage from 'electron-json-storage'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
// import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import {Link} from 'react-router-dom'
import {clearCachedData} from '../utils/storageUtils'
import {seedInvoiceData} from '../utils/invoicesUtils'
import {seedHeadsetData} from '../utils/headsetLaunchUtils'
import {ROOT_PATH} from '../constants'

// import logo from './logo.jsx'

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
      props.auth.lock.getProfile(authResult.idToken, (err, profile) => {
        var options = {
          id_token : authResult.idToken,
          api : 'firebase',
          scope : 'openid name email displayName',
          target: 'H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX'
        };
        props.auth.auth0.getDelegationToken(options, function(err, result) {
          if (!err) {
            let userName
            if (profile.username) userName = profile.username
            else userName = profile.nickname
            // Exchange the delegate token for a Firebase auth token
            firebase.auth().signInWithCustomToken(result.id_token)
            .then(() => firebase.database().ref('users').once('value'))
            .then(snapshot => {
              let profileExists = false
              snapshot.forEach(x => {
                if (x.val().email === profile.email) profileExists = true
              })
              if (!profileExists) {
                //firebase.database().ref('users').push(profile)
                firebase.database().ref().child('users').update({
                  [userName]: profile
                })
                console.log('******Just created profile in firebase: ', profile)
              }
            })
            .then(() => props.login(profile, authResult.idToken))
            .then(() => {
              firebase.database().ref(`users/${userName}/message`).on('value', function (snapshot) {
                const message = snapshot.val()
                console.log(message)
                let myNotification = new Notification(`${message.sender} Sent You a New Visualization`, {
                  body: message.body
                })
                myNotification.onclick = () => {
                  console.log('Notification clicked')
                }
              })
            })
            .catch(function(error) {
              console.log(error)
            })

            // // Exchange the delegate token for a Firebase auth token
            // firebase.auth().signInWithCustomToken(result.id_token)
            // .then(() => firebase.database().ref('users').push(profile))
            // .then(() => props.login(profile, authResult.idToken))
            // .catch(function(error) {
            //   console.log(error)
            // })
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

  function logoutNavBar() {
    props.logout();
  }


  return (
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src="http://i64.tinypic.com/35cq5vn.png" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

              <LinkContainer to="/dashboard">
                  <NavItem eventKey={1}>Dashboard</NavItem>
              </LinkContainer>
               <LinkContainer to="/explorer">
                  <NavItem eventKey={2}>Explorer</NavItem>
              </LinkContainer>
              <LinkContainer to="/sqlab">
                  <NavItem eventKey={3}>SQLab</NavItem>
              </LinkContainer>
              <LinkContainer to="/allcardsview">
                  <NavItem eventKey={4}>Charts</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={5} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1} onSelect={clearCachedData}>Clear Cached Data</MenuItem>
                <MenuItem eventKey={5.2} onSelect={seedHeadsetData}>Seed Headset Data For 60 seconds</MenuItem>
                <MenuItem eventKey={5.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={5.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<i className="fa fa-user fa-fw"></i>} id = "basic-nav-dropdown">
                  <MenuItem eventKey={1.1}>
                    <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
                  </MenuItem>
                  <MenuItem eventKey={1.2}>
                    <span><i className="fa fa-gear fa-fw"></i> Settings </span>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey = {1.3} onClick = {logInOrOut}>
                    <span><i className = "fa fa-sign-out fa-fw" />{logInOrOutLabel}</span>
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

