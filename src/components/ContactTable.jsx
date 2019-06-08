import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Table, DropdownButton, Dropdown, Container } from "react-bootstrap";
import { anaezeImg } from "../images";

axios.defaults.baseURL = "http://localhost:8000";

const initialState = {
  people: []
};
const reducer = (state, action) => {
  switch (action.type) {
    case "people":
      return { ...state, people: action.payload };
    default:
      return state;
  }
};
function ContactTable(props) {
  const gotoProfile = personId => () =>
    props.history.push(`/people/${personId}`);

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async dispatch => {
    const { data } = await axios.get("/people");
    dispatch({ type: "people", payload: data.data });
  };

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);
  return (
    <Container>
      {!state.people.length ? (
        <div className="empty-contacts">
          <i className="fa fa-folder-open-o" />
          <h1>Your contact list is empty </h1>
          <h4> Add some contacts now</h4>
        </div>
      ) : (
        <Table className="people-table" striped responsive hover>
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
            {state.people.map(person => (
              <tr key={person._id}>
                <td onClick={gotoProfile(person._id)}>
                  <a href="#profile">
                    <img src={anaezeImg} alt="" className="profile-icon" />
                  </a>
                </td>
                <td onClick={gotoProfile(person._id)}>
                  <a href="#profile">{person.fullname}</a>
                </td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.address}</td>
                <td>
                  <DropdownButton alignRight title="" drop="right">
                    <Dropdown.Item
                      onClick={() =>
                        props.history.push(`/people/${person._id}`)
                      }
                      className="edit-person"
                      eventKey="2"
                    >
                      <i className="fa fa-edit" /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item className="delete-person" eventKey="1">
                      <i className="fa fa-trash-o" /> Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ContactTable;
