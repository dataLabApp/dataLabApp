import React, { Component } from 'react'
var ReactFauxDOM = require('react-faux-dom')
import { ROOT_PATH } from '../constants'
import ShareCardModal from './ShareCardModal'
import { connect } from 'react-redux'
const d3 = require('d3')
const d3SaveSvg = require('d3-save-svg')

class AllCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showShareCardModal: false,
      emailAddresses: [],
      emailMessage: '',
      selectedUsers: new Set()
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleSendEmails = this.handleSendEmails.bind(this)
    this.handleEmailMessageChange = this.handleEmailMessageChange.bind(this)
    this.handleCheckBoxesChange = this.handleCheckBoxesChange.bind(this)
  }

  handleShowModal(event) {
    this.props.setAllUsers()
    this.setState({
      showShareCardModal: true
    })
  }

  handleCheckBoxesChange(boolChecked, username) {
    const userSet = this.state.selectedUsers
    boolChecked ? userSet.add(username) : userSet.delete(username)
    this.setState({
      selectedUsers: userSet
    })
  }

  handleSendEmails(event) {
    event.preventDefault()
    let sender = ''
    this.props.currentOwner ? sender = this.props.currentOwner.nickname : sender = 'A DataLab User'
    this.state.selectedUsers.forEach(x => {
      firebase.database().ref().child('users').child(x).update({
        message: {
          body: event.target.emailMessage.value,
          sender: sender
        }
      })
    })

    this.setState({
      showShareCardModal: false,
      selectedUsers: new Set()
    })
  }

  handleEmailMessageChange(event) {
    this.setState({
      emailMessage: event.target.value
    })
  }

  render() {
    const title = this.props.title || 'Delightful Chart Example'
    const chart = this.props.chart
    const exportAsSVG = () => {
      var config = {
        filename: title
      }
      d3SaveSvg.save(d3.select('svg').node(), config)
    }
    return (
      <div className="x_panel tile">
        <div className="x_title">
        <ul className ="nav navbar-left">
          <li style={{"align-items": "center"}}><h4>{title}</h4></li>
        </ul>
          <ul className="nav navbar-right panel_toolbox">
            <li><a onClick={exportAsSVG} className="collapse-link"><i className="fa fa-file-code-o"></i></a></li>
            {/*<li><a className="collapse-link"><i className="fa fa-cloud-upload"></i></a></li>*/}
            <li><a onClick={this.handleShowModal} ><i className="fa fa-share"></i></a></li>
            <li><a onClick={this.props.onRemove} className="close-link"><i className="fa fa-close"></i></a></li>
          </ul>    
            <div className="clearfix"></div>
       </div>
          <div className="x_content" style={{ 'height': 'auto', 'width': '100%' }}>
            <div>
              {chart}
            </div>
            <div>
              {
                this.state.showShareCardModal &&
                <ShareCardModal users={this.props.allUsers} handleSendEmails={this.handleSendEmails} handleEmailMessageChange={this.handleEmailMessageChange} handleCheckBoxesChange={this.handleCheckBoxesChange}/>
              }
            </div>
          </div>
          </div>
          
    )
  }
}

// ----------------------- Container -----------------------

import { fetchUsers } from '../reducers/userReducer'

const mapStateToProps = (state, ownProps) => ({
  allUsers: state.user.allUsers,
  currentOwner: state.auth.profile
})

const mapDispatchToProps = dispatch => ({
  setAllUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCard)
