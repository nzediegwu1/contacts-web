import React, { useReducer } from "react";
import axios from "axios";
import {
  Card,
  Nav,
  Container,
  Row,
  Image,
  Table,
  Form,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { anaezeImg } from "../images";

axios.defaults.baseURL = "http://localhost:8000";

const initialState = { profileActive: true, editActive: false };
const changedState = { profileActive: false, editActive: true };
const reducer = (state, action) => {
  switch (action.type) {
    case "profile":
      return !state.profileActive ? initialState : state;
    case "edit":
      return !state.editActive ? changedState : state;
    default:
      return state;
  }
};

const userDetails = [
  { title: "Name", value: "Anaeze Nsoffor", key: "title-name" },
  {
    title: "Email",
    value: "nzediegwu@gmail.com",
    key: "title-email"
  },
  {
    title: "address",
    value: "1 Aminu Street, Mende, Maryland",
    key: "title-address"
  },
  {
    title: "Phone",
    value: "+2347067356519",
    key: "title-phone"
  },
  {
    title: "Gender",
    value: "Male",
    key: "title-gender"
  },
  {
    title: "Occupation",
    value: "Software engineer",
    key: "title-occupa"
  },
  {
    title: "Bio",
    value: "---",
    key: "title-bio"
  }
];

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
  },
  {
    controlId: "formGroupOccupation",
    icon: "fa fa-vcard",
    type: "text",
    placeholder: "Occupation",
    key: "user-occupation"
  },
  {
    controlId: "formGroupAddress",
    icon: "fa fa-facebook-official",
    type: "text",
    placeholder: "Facebook",
    key: "user-facebook"
  },
  {
    controlId: "formGroupAddress",
    icon: "fa fa-twitter",
    type: "text",
    placeholder: "Twitter",
    key: "user-twitter"
  },
  {
    controlId: "formGroupAddress",
    icon: "fa fa-linkedin-square",
    type: "text",
    placeholder: "LinkedIn",
    key: "user-linkedIn"
  }
];

// make a request to get single user
// set userDetails array to be Object.entries(user)
// refactor array rendering in component accordingly

function ProfileTable(props) {
  const getProfile = () => {
    return axios.get(`/people/${props.params.id}`);
  };
  return (
    <Table className="profile-content" striped responsive hover>
      <tbody>
        {userDetails.map(item => (
          <tr key={item.key}>
            <td>{item.title}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function ProfileForm() {
  return (
    <Form className="profile-form">
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
  );
}

export default function ProfilePage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="container">
      <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item onClick={() => dispatch({ type: "profile" })}>
              <Nav.Link active={state.profileActive} href="#profile">
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => dispatch({ type: "edit" })}>
              <Nav.Link active={state.editActive} href="#edit">
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
            {state.profileActive ? <ProfileTable /> : <ProfileForm />}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
