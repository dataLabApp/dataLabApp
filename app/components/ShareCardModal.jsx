import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'
import { connect } from 'react-redux'

const ShareCardModal = props => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title> Share Your Card </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Select coworkers to share your card with.
        {/*<Form onSubmit = {  } >*/}
        <Form >
          <FormGroup>
              <ControlLabel>Name of Card</ControlLabel>
              {'  '}
              <FormControl
                id="sliceName"
                type="text"
                placeholder="Enter card name - or message to coworkers - tbd"
              />
              { props.users &&
                props.users.map((x, index) =>
                  <Checkbox key={index} readOnly>
                    {x.email}
                  </Checkbox>
                )
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareCardModal)
