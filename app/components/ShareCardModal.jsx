import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'
import { connect } from 'react-redux'

const ShareCardModal = props => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title> Share Your Visualization </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Select coworkers to share your card with.
       <Form onSubmit = { event => props.handleSendEmails(event) } >
          <FormGroup>
              <ControlLabel>Message to Coworkers</ControlLabel>
              {'  '}
              <FormControl
                id="emailMessage"
                type="text"
                value={ props.emailMessage }
                placeholder="Enter message to coworkers."
                onChange={ event => props.handleEmailMessageChange(event) }
              />
              { props.users &&
                props.users.map((x, index) =>
                  <Checkbox key={index} readOnly>
                    {x.username}, {x.name}
                  </Checkbox>

                )
              }
            </FormGroup>
          <Button bsStyle="primary" type='submit'>Send Message</Button>
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
