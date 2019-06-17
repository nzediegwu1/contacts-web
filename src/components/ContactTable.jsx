import React, { useEffect, useContext } from "react";
import { useState } from "reinspect";
import toastr from "toastr";
import { handleErrors } from "../util";
import {
  Table,
  DropdownButton,
  Dropdown,
  Container,
  Modal,
  Button,
  ButtonToolbar
} from "react-bootstrap";
import { AppContext } from "../app";
import { user } from "../images";
import { client } from "../constants";

const fetchUsers = async dispatch => {
  const { data } = await client.get("/contacts");
  return dispatch({ type: "people", payload: data.data });
};

const ConfirmModal = ({ show, handleShow, contactId }) => {
  const [state, dispatch] = useContext(AppContext);

  const deleteContact = async () => {
    try {
      const { data } = await client.delete(`/contacts/${contactId}`);
      toastr.success(`${data.data.fullname} Successfully deleted`);
      const newPeople = state.people.filter(person => person._id !== contactId);
      dispatch({ type: "people", payload: newPeople });
      handleShow(false);
    } catch (error) {
      handleErrors(error);
    }
  };
  return (
    <Modal show={show} onHide={() => handleShow(false)}>
      <Modal.Body>
        <h5>Are you sure you wish to delete this contact?</h5>
        <ButtonToolbar>
          <Button onClick={() => handleShow(false)} variant="primary">
            Cancel
          </Button>
          &nbsp;
          <Button onClick={deleteContact} variant="danger">
            Yes
          </Button>
        </ButtonToolbar>
      </Modal.Body>
    </Modal>
  );
};

function ContactTable({ history }) {
  const [state, dispatch] = useContext(AppContext);
  const [show, setShow] = useState(false, "showDeleteModal");
  const [selectedContact, setSelectedContact] = useState("", "selectedContact");

  const gotoProfile = personId => {
    dispatch({
      type: "profileTab",
      payload: { profileActive: true, editActive: false }
    });
    history.push(`/contacts/${personId}`);
  };

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  const openDeleteModal = async contactId => {
    setShow(true);
    setSelectedContact(contactId);
  };

  const triggerEdit = person => {
    dispatch({
      type: "editTab",
      payload: { profileActive: false, editActive: true }
    });
    dispatch({ type: "person", payload: person });
    history.push(`/contacts/${person._id}`);
  };

  const contactsToRender = people =>
    people.filter(
      ({ fullname, email, phone, address }) =>
        fullname.toLowerCase().includes(state.searchKey) ||
        email.toLowerCase().includes(state.searchKey) ||
        phone.toLowerCase().includes(state.searchKey) ||
        address.toLowerCase().includes(state.searchKey)
    );

  return (
    <Container>
      {!state.people.length ? (
        <div className="empty-contacts">
          <i className="fa fa-folder-open-o" />
          <h1>Your contact list is empty </h1>
          <h4> Add some contacts now</h4>
        </div>
      ) : (
        <Table className="contact-table" striped hover responsive>
          <thead className="contacts-table-head">
            <tr>
              <th />
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {contactsToRender(state.people).map(person => (
              <tr key={person._id}>
                <td onClick={() => gotoProfile(person._id)}>
                  <a href="#profile">
                    <img src={user} alt="" className="profile-icon" />
                  </a>
                </td>
                <td onClick={() => gotoProfile(person._id)}>
                  <a href="#profile">{person.fullname}</a>
                </td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.address}</td>
                <td>
                  <DropdownButton alignRight title="" drop="right">
                    <Dropdown.Item
                      onClick={() => triggerEdit(person)}
                      className="edit-person"
                      eventKey="2"
                    >
                      <i className="fa fa-edit" /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => openDeleteModal(person._id)}
                      className="delete-person"
                      eventKey="1"
                    >
                      <i className="fa fa-trash-o" /> Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ConfirmModal
        show={show}
        handleShow={setShow}
        contactId={selectedContact}
      />
    </Container>
  );
}

export default ContactTable;
