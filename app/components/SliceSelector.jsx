import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class SliceSelector extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <form>
        <FormGroup>
          <ControlLabel>Data Slice</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.props.changeSlice}>
            <option key='0' value={this.props.currentSlice.title} >{this.props.currentSlice.title}</option>
            {this.props.data.allSlices.map((slice,index)=>{
              if(slice.title!==this.props.currentSlice.title)return(
                <option key={''+(index+1)} value={slice.title}>{slice.title}</option>
              )
            })}
          </FormControl>
        </FormGroup>
      </form>
    )
  }
}

let mapStateToProps = (state)=>(
  {
    data:state.data
  }
)

let mapDispatchToProps = (dispatch)=>(
  {

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SliceSelector)
