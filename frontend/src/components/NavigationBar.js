import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


import logo from "../assets/images/logo.png";
import LoginModal from "./LoginModal";

import { Link } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function NavigationBar(props) {
  const logoStyle = {
    height: "10vh",
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async (email, password) => {
    console.log(email, password);

    const url = "http://localhost:8000/auth";

    const params = {
      email, //también se puede escribir email: email
      password, //también se puede escribir password:password
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 200) {
      props.updateUser({ name: data.data });

      handleCloseLoginModal();
    } else {
      alert(data.message);
    }
    console.log(data);
  };

  const handleLogout = async () => {
    const url = "http://localhost:8000/auth";

    const response = await fetch(url, { 
      method: 'DELETE',
      credentials:'include',
     });

     const data = response.json()

    if (response.status === 200) {
      props.updateUser(null);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link to="/">
          <Navbar.Brand href="#home">
            <img style={logoStyle} src={logo} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Living</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Patio</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Cocina</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Habitación</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Baño</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="#"><FontAwesomeIcon color="white" className="fa-2x mr-3" icon={faCartPlus} /></Nav.Link>

            {props.user ? (
              <>                    
                <Link to="/mispublicaciones" className="nav-link">Mis Publicaciones</Link>
                <Link to="/favoritos" className="nav-link">Favoritos</Link>
                
                <NavDropdown
                  alignRight
                  title={props.user.name}
                  id="basic-nav-dropdown"
                >
                  
                  <Link                     
                    to="/profileedit" 
                    show={showLoginModal} 
                    onClick={props.handleCloseLoginModal}>
                      <NavDropdown.Item>Ajustes</NavDropdown.Item>
                  </Link>                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button onClick={handleLoginClick} variant="success">
                Iniciar Sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal
        show={showLoginModal}
        handleCloseLoginModal={handleCloseLoginModal}
        handleLogin={handleLogin}
      />
    </>
  );
}
