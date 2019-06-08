import React from "react";
import { Form, FormControl, InputGroup, Button, Modal } from "react-bootstrap";

const formControls = [
  {
    controlId: "formGroupName",
    icon: "fa fa-user",
    type: "text",
    placeholder: "Full name",
    key: "user-name"
  },
  {
    controlId: "formGroupEmail",
    icon: "fa fa-envelope",
    type: "text",
    placeholder: "Email",
    key: "user-email"
  },
  {
    controlId: "formGroupPhone",
    icon: "fa fa-phone-square",
    type: "number",
    placeholder: "Phone",
    key: "user-phone"
  },
  {
    controlId: "formGroupAddress",
    icon: "fa fa-map-marker",
    type: "text",
    placeholder: "Address",
    key: "user-address"
  }
];

const buttons = [
  { variant: "secondary", key: "close-form", text: "Close" },
  { variant: "success", key: "save-profile", text: "Save" }
];

function ContactModal({ show, handleShow }) {
  return (
    <Modal show={show} onHide={handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {formControls.map(control => (
            <Form.Group key={control.key} controlId={control.controlId}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className={control.icon} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type={control.type}
                  placeholder={control.placeholder}
                />
              </InputGroup>
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {buttons.map(({ variant, key, text }) => (
          <Button key={key} variant={variant} onClick={handleShow(false)}>
            {text}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
}
export default ContactModal;
