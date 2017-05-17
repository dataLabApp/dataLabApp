import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'

const SaveSliceModal = props => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title> Save Slice </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Save your slice under a unique name.
        <Form onSubmit = { event => props.handleSaveSlice(event) } >
          <FormGroup>
              <ControlLabel>Name of Slice</ControlLabel>
              {'  '}
              <FormControl
                id="sliceName"
                type="text"
                value={props.sliceName}
                placeholder="Enter slice name"
                onChange={event => props.handleSliceNameChange(event)}
              />
            </FormGroup>
          <Button bsStyle="primary" type='submit'>Save </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/*<Button> Cancel </Button>*/}
      </Modal.Footer>

    </Modal.Dialog>
  </div>
)

// ------------- Container
const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(SaveSliceModal)
