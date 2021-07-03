import React from "react";

export default function Register() {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password"/>
        </Form.Group>
        <Form.Group controlId="formBasicRePassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="rePassword"/>
        </Form.Group>
        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </div>
  );
}
