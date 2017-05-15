import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'



export default props => {
  let columnNames = Object.keys(props.currentSlice.data[0])
  return (
    <form>
      <FormGroup>
        <ControlLabel>{props.label}</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.changeConfig(props.attribute)}>
          <option key='0' value={props.currentSetting}>{props.currentSetting}</option>
          {columnNames.map((column, index) => {
            if (column!==props.currentSetting) {
              return (
              <option key={''+(index+1)} value={column}>{column}</option>
              )
            }
          })}
        </FormControl>
      </FormGroup>
    </form>
  )
}


// class AxisSelector extends Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <form>
//         <FormGroup>
//           <ControlLabel>Axis</ControlLabel>
//           <FormControl componentClass="select" placeholder="select" onChange={this.props.changeSlice}>
//             <option key='0' value={this.props.currentSlice.title} >{this.props.currentSlice.title}</option>
//             {this.props.data.allSlices.map((slice, index) => {
//               if (slice.title!==this.props.currentSlice.title) {return(
//                 <option key={''+(index+1)} value={slice.title}>{slice.title}</option>
//               )}
//             })}
//           </FormControl>
//         </FormGroup>
//       </form>
//     )
//   }
// }

// const mapStateToProps = (state) => (
//   {
//     data: state.data
//   }
// )

// const mapDispatchToProps = (dispatch) => (
//   {

//   }
// )

// export default connect(mapStateToProps, mapDispatchToProps)(AxisSelector)
