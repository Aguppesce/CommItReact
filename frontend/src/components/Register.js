import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Swal from 'sweetalert2'

export default function Register(props) {
  
  const [usuarios, setUsuarios] = useState([]);

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSave = async (message)  => {
    const formData = new FormData();

    formData.append( 'usuario', usuario);    
    formData.append( 'email', email);
    formData.append( 'password', password); 

    const url = `http://localhost:8000/usuarios`
    
    const response = await fetch(url, 
      {method: 'POST', 
      body: formData, 
      credentials:'include'})
    
    const data = await response.json();

    setUsuarios(data);

    Swal.fire({
      text: message,
      icon: 'success'
    })
  }
    

  const handleUsuarioChange = (event)=> {
    setUsuario(event.target.value);
  }
  const handleEmailChange = (event)=> {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event)=> {
    setPassword(event.target.value);
  }


  return (
    <Container>
      <Row>
        <Col className="my-4">
          <Form>
          <Form.Group>
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control 
                type="text" 
                value={usuario} 
                onChange={handleUsuarioChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={handlePasswordChange}/>
            </Form.Group>
            <Form.Group>
            <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={handlePasswordChange}/>
            </Form.Group>
            <Button className="" variant="success" type="submit" onClick={handleSave}>
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}