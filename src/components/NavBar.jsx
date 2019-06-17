import React, { Fragment, useContext } from "react";
import { useState } from "reinspect";
import { Form, FormControl, Navbar, Button } from "react-bootstrap";
import { ContactModal } from ".";
import { AppContext } from "../app";

function NavigationBar(props) {
  const [show, setShow] = useState(false, "navBar");
  const [, dispatch] = useContext(AppContext);

  const handleShow = condition => () => {
    setShow(condition);
  };

  const handleSearch = event => {
    props.history.push("/");
    const { value } = event.target;
    dispatch({ type: "searchKey", payload: value.trim().toLowerCase() });
  };
  return (
    <Fragment>
      <Navbar
        className="navbar-expand-sm"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand href="#home">
          <Button
            onClick={() => props.history.push("/")}
            variant="outline-primary"
            className="logo"
          >
            <b>CT</b>
          </Button>
          &nbsp;
          <Button onClick={handleShow(true)} className="add-profile">
            <i className="add-icon fa fa-plus-square" />
            &nbsp; Add
          </Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form onSubmit={e => e.preventDefault()} inline className="ml-auto">
            <div className="input-group-append search-form">
              <FormControl
                onChange={handleSearch}
                type="text"
                placeholder="Search"
              />
              <Button variant="outline-info">
                <i className="fa fa-search" />
              </Button>
            </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ContactModal show={show} handleShow={handleShow} />
    </Fragment>
  );
}
export default NavigationBar;
