import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

class D3TextEditor extends Component{
  constructor(props){
    super(props)
    this.state = {formText: props.D3template ? props.D3template : 'start creating your chart here'}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.revert = this.revert.bind(this)
  }

  componentDidMount(){
    this.setState({oldFormTexts: [this.state.formText]})
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({oldFormTexts: this.state.oldFormTexts.concat([this.state.formText])})
    this.props.handleCode(this.state.formText)
  }

  handleChange(e){
    this.setState({formText: e.target.value})
  }

  revert(){
    let reversions = 1
    if(this.state.formText === this.state.oldFormTexts)reversions++
    while(reversions){
      this.setState({formText: this.state.oldFormTexts.pop()})
      reversions--;
    }
  }

  render(){
    return(
    <div>
      <form onSubmit={this.handleSubmit} >
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Textarea</ControlLabel>
          <FormControl componentClass="textarea" onChange={this.handleChange} value={this.state.formText} rows={"25"} />
        </FormGroup>
        <Button onClick={this.revert} type='button'>
          Revert
        </Button>
        <Button type="submit">
          Save
        </Button>
      </form>
    </div>
    );
  }
}

export default D3TextEditor
