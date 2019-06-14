/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Card, Nav, Container, Row, Image, Table } from "react-bootstrap";
import { anaezeImg } from "../images";
import { AppContext } from "../app";
import { formControls, initialFormState } from "../constants";
import PersonForm from "./PersonForm";

axios.defaults.baseURL = "http://localhost:8000";

function ProfileTable({ data = {} }) {
  return (
    <Table className="profile-content" striped bordered hover responsive>
      <tbody>
        {Object.entries(data).reduce((accumulator, [title, value]) => {
          const ignoreList = ["_id", "createdAt", "updatedAt", "__v"];
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
  { variant: "success", key: "save-profile", text: "Save", type: "submit" }
];

function ProfileForm() {
  const handleSubmit = event => {
    console.log("submit function triggered");
    event.preventDefault();
  };
  return (
    <div className="edit-profile-form">
      <PersonForm
        handleSubmit={handleSubmit}
        formControls={formControls}
        buttons={buttons}
        initialState={initialFormState}
        tag="editProfileForm"
      />
    </div>
  );
}
const getProfile = async (dispatch, params) => {
  const { data } = await axios.get(`/people/${params.id}`);
  return dispatch({ type: "person", payload: data.data });
};

export default function ProfilePage(props) {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    getProfile(dispatch, props.match.params);
  }, []);
  return (
    <div className="container">
      <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item onClick={() => dispatch({ type: "profileTab" })}>
              <Nav.Link
                active={state.profileTabs.profileActive}
                href="#profile"
              >
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => dispatch({ type: "editTab" })}>
              <Nav.Link active={state.profileTabs.editActive} href="#edit">
                Edit
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row className="profile-header">
              <Image className="profile-img" src={anaezeImg} roundedCircle />
              <div className="social-icons">
                <i className="fa fa-facebook-official" />
                <i className="fa fa-twitter" />
                <i className="fa fa-linkedin-square" />
              </div>
            </Row>
            {state.profileTabs.profileActive ? (
              <ProfileTable data={state.person} />
            ) : (
              <ProfileForm />
            )}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
