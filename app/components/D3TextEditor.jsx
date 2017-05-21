import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import AceEditor from 'react-ace'
import brace from 'brace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

class D3TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { formText: props.codeForEditor || 'start creating your chart here' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.revert = this.revert.bind(this)
  }

  componentDidMount() {
    this.setState({ oldFormTexts: [this.state.formText] })
  }

  componentWillReceiveProps(newProps) {
    this.setState({ formText: newProps.codeForEditor })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ oldFormTexts: this.state.oldFormTexts.concat([this.state.formText]) })
    this.props.handleCode(this.state.formText)
  }

  handleChange(newValue) {
    this.setState({ formText: newValue })
  }

  revert() {
    let reversions = 1
    if (this.state.formText === this.state.oldFormTexts) reversions++
    while (reversions) {
      this.setState({ formText: this.state.oldFormTexts.pop() })
      reversions--;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <div className="row">
            <div className="col-sm-8">
            </div>
            <div className="col-sm-3 pull-right">
              <Button bsStyle="primary" style={{ align: 'right' }} onClick={this.revert} type='button'>
                Revert
              </Button>
              {'  '}
              <Button bsStyle="primary" style={{ align: 'right' }} type="submit">
                Save
              </Button>
            </div>
            <br />
            <br />
            <div className="row">
              <FormGroup style={{ align: 'center' }} controlId="formControlsTextarea">
                <AceEditor fontSize={18} style={{ marginLeft: '100px', marginTop: '15px' }} mode='javascript' theme='monokai' width='1000px' wrapEnabled={true} onChange={this.handleChange} value={this.state.formText} rows={"25"} />
              </FormGroup>
            </div>
            </div>
        </form>
      </div>
    );
  }
}

export default D3TextEditor
