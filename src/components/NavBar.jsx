import React, { Fragment, useState } from "react";
import { Form, FormControl, Navbar, Button } from "react-bootstrap";
import { ContactModal } from ".";

function NavigationBar(props) {
  const [show, setShow] = useState(false);
  const handleShow = condition => () => {
    setShow(condition);
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
            <b>PR</b>
          </Button>
          &nbsp;
          <Button onClick={handleShow(true)} className="add-profile">
            <i className="add-icon fa fa-plus-square" />
            &nbsp; Add
          </Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline className="ml-auto">
            <div className="input-group-append search-form">
              <FormControl type="text" placeholder="Search" />
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
