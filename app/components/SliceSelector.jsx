import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class SliceSelector extends Component {
  render() {
    let currentSliceTitle = this.props.currentSlice ? this.props.data.allSlices.filter(slice => slice.id === this.props.currentSlice)[0].title : ''

    return (
      <form>
        <FormGroup>
          <ControlLabel>Data Slice</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.props.changeSlice}>
            <option key='0' value={currentSliceTitle} >{currentSliceTitle}</option>
            {this.props.data.allSlices.map((slice, index) => {
              if (slice.id !== this.props.currentSlice) {
                return (
                <option key={''+(index+1)} value={slice.title}>{slice.title}</option>
                )
              }
            })}
          </FormControl>
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    data: state.data
  }
)

const mapDispatchToProps = (dispatch) => (
  {

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SliceSelector)
