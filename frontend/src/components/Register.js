import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function Register(props) {

  const handleRegisterClick = (event) => {
    event.preventDefault();
    props.onRegisterClick.Default(props.id);
  }
  return (
    <Container>
      <Row>
        <Col className="my-4">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="formBasicRePassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="rePassword" />
            </Form.Group>
            <Button className="" variant="success" type="submit" onClick={handleRegisterClick}>
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
