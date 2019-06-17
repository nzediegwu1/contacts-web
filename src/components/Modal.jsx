import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import toastr from "toastr";
import { formControls, initialFormState, addModalButtons } from "../constants";
import PersonForm from "./PersonForm";
import { AppContext } from "../app";
import { handleErrors } from "../util";
import {client} from '../constants'


function ContactModal({ show, handleShow }) {
  const [state, dispatch] = useContext(AppContext);

  const saveContact = async (e, details) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/contacts", details);
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
          buttons={addModalButtons(handleShow(false))}
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
