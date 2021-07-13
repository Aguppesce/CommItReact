import React,{ useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import { Link } from "react-router-dom";

export default function LoginModal(props) {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleAcceptClick = ()=>{
    props.handleLogin(email, password);
  }

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  
  return (
    <Modal show={props.show} onHide={props.handleCloseLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={handleEmailChange}/>            
          </Form.Group>

          <Form.Group>
            <Form.Label>Constraseña</Form.Label>
            <Form.Control 
              type="password"
              value={password} 
              onChange={ handlePasswordChange }/>
          </Form.Group>
        </Form>
        <Link 
          to="/register" 
          show={showLoginModal} 
          onClick={props.handleCloseLoginModal}>¿No tienes una cuenta?</Link>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseLoginModal}>
          Cancelar
        </Button>
        <Button
          variant="primary" 
          onClick={ handleAcceptClick }>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
}
