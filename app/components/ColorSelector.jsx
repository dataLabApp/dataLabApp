import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {COLOR_SCHEMES} from '../constants'

export default props => {
  let currentScheme
  for (let schemeName in COLOR_SCHEMES){
    if (COLOR_SCHEMES[schemeName]===props.currentScheme) currentScheme=schemeName
  }
  const schemeNames = Object.keys(COLOR_SCHEMES)
  return (
    <form>
      <FormGroup>
        <ControlLabel>{props.label}</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={(e) => props.setScheme(COLOR_SCHEMES[e.target.value])}>
          <option key='0' value={currentScheme}>{currentScheme}</option>
          {schemeNames.map((schemeName, index) => {
            if (schemeName!==currentScheme) {
              return (
              <option key={''+(index+1)} value={schemeName}>{schemeName}</option>
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
