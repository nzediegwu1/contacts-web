import React, { useContext } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import toastr from "toastr";
import { formControls, initialFormState } from "../constants";
import PersonForm from "./PersonForm";
import { AppContext } from "../app";
import { handleErrors } from "../util";

axios.defaults.baseURL = "http://localhost:8000";

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
  const [state, dispatch] = useContext(AppContext);
  
  const saveContact = async (e, details) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/people", details);
      state.people.unshift(data.data);
      dispatch({ type: "people", payload: state.people });
      handleShow(false)();
      toastr.success(data.message);
    } catch (error) {
      handleErrors(error);
    }
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
          tag="addProfileForm"
        />
      </Modal.Body>
    </Modal>
  );
}
export default ContactModal;
