/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import toastr from "toastr";
import { Card, Nav, Container, Row, Image, Table } from "react-bootstrap";
import { user } from "../images";
import { AppContext } from "../app";
import { formControls, ignoreList, navProps, socialIcons } from "../constants";
import PersonForm from "./PersonForm";
import { handleErrors } from "../util";
import { client } from "../constants";

function ProfileTable({ data = {} }) {
  return (
    <Table className="profile-content" striped bordered hover responsive>
      <tbody>
        {Object.entries(data).reduce((accumulator, [title, value]) => {
          if (!ignoreList.includes(title)) {
            accumulator.push(
              <tr key={4 / Math.random()}>
                <td>{title}</td>
                <td>{value}</td>
              </tr>
            );
          }
          return accumulator;
        }, [])}
      </tbody>
    </Table>
  );
}
const buttons = [
  {
    variant: "success",
    key: "save-profile",
    text: "Save",
    type: "submit",
    style: "submit-button"
  }
];

function ProfileForm({ person }) {
  const [, dispatch] = useContext(AppContext);
  const handleSubmit = async (event, formState) => {
    event.preventDefault();
    try {
      const { data } = await client.patch(`/contacts/${person._id}`, formState);
      dispatch({ type: "person", payload: data.data });
      toastr.success("Suffessfully updated contact");
    } catch (error) {
      handleErrors(error);
    }
  };
  return (
    <div className="edit-profile-form">
      <PersonForm
        handleSubmit={handleSubmit}
        formControls={formControls}
        buttons={buttons}
        initialState={person}
        tag="editProfileForm"
      />
    </div>
  );
}
const getProfile = async (dispatch, params) => {
  const { data } = await client.get(`/contacts/${params.id}`);
  return dispatch({ type: "person", payload: data.data });
};
const deriveUrl = (person, service) =>
  (person && person[service] && person[service].length && person[service]) ||
  undefined;

export default function ProfilePage(props) {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    getProfile(dispatch, props.match.params);
  }, []);
  const { person } = state;
  return (
    <div className="container">
      <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            {navProps.map(item => (
              <Nav.Item
                key={item.key}
                onClick={() =>
                  dispatch({ type: item.type, payload: item.payload })
                }
              >
                <Nav.Link active={state[item.activeType]} href={item.hash}>
                  {item.text}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row className="profile-header">
              <Image className="profile-img" src={user} roundedCircle />
              <div className="social-icons">
                {socialIcons.map(item => (
                  <a
                    href={deriveUrl(person, item.service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={item.key}
                  >
                    <i className={`fa ${item.icon}`} />
                  </a>
                ))}
              </div>
            </Row>
            {state.profileActive ? (
              <ProfileTable data={state.person} />
            ) : (
              <ProfileForm person={state.person} />
            )}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
