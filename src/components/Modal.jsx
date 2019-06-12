import React from "react";
import { Modal } from "react-bootstrap";
import { formControls, initialFormState } from "../constants";
import PersonForm from "./PersonForm";

const buttons = closeHandler => [
  {
    variant: "secondary",
    key: "close-form",
    text: "Close",
    type: "button",
    onClick: closeHandler
  },
  {
    variant: "success",
    key: "save-profile",
    text: "Save",
    type: "submit"
  }
];

function ContactModal({ show, handleShow }) {
  const saveContact = e => {
    e.preventDefault();
    handleShow(false)();
    console.log("add contact submitted");
  };
  return (
    <Modal show={show} onHide={handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PersonForm
          buttons={buttons(handleShow(false))}
          formControls={formControls}
          initialState={initialFormState}
          handleSubmit={saveContact}
          tag="add-profile-form"
        />
      </Modal.Body>
    </Modal>
  );
}
export default ContactModal;
