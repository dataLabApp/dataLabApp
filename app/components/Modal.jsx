import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'

const modalInstance = (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        One fine body...
      </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>

    </Modal.Dialog>
  </div>
);

ReactDOM.render(modalInstance, mountNode);
