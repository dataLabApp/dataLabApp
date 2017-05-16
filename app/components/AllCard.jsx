import React, { Component } from 'react'
var ReactFauxDOM = require('react-faux-dom')
import { ROOT_PATH } from '../constants'
import ShareCardModal from './ShareCardModal'
import { connect } from 'react-redux'

class AllCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showShareCardModal: false
    }
    this.handleShowModal = this.handleShowModal.bind(this)
  }

  handleShowModal(event) {
    this.props.setAllUsers()
    this.setState({
      showShareCardModal: true
    })
  }

  render() {
    const title = this.props.title || 'Delightful Chart Example'
    const chart = this.props.chart
    return (
      <div className="x_panel tile">
        <div className="x_title">
          <h2>{ title }</h2>
          <ul className="nav navbar-right panel_toolbox">
            <li><a onClick={ this.handleShowModal } ><i className="fa fa-cloud-upload"></i></a></li>
            <li><a className="collapse-link"><i className="fa fa-share"></i></a></li>
            <li><a onClick={ this.props.onRemove } className="close-link"><i className="fa fa-close"></i></a></li>
          </ul>
          <div className="clearfix"></div>
        </div>
        <div className="x_content" style={{ 'height': 'auto', 'width': '100%' }}>
          <div>
            {chart}
          </div>
        </div>
            {
              this.state.showShareCardModal &&
              <ShareCardModal users={ this.props.allUsers } />
            }
      </div>
    )
  }
}

// ----------------------- Container -----------------------

import { fetchUsers } from '../reducers/userReducer'

const mapStateToProps = (state, ownProps) => ({
  allUsers: state.user.allUsers
})

const mapDispatchToProps = dispatch => ({
  setAllUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCard)

// <div className="x_panel tile fixed_height_320">
