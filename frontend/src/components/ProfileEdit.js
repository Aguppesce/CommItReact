import React, {useState} from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Swal from 'sweetalert2'

export default function ProfileEdit(props) {
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [provincia, setProvincia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [codPostal, setCodPostal] = useState('');
  const [password, setPassword] = useState('');
  

  const handlePutUser = ()  => {
    const formData = new FormData();
    
    formData.append( 'nombre', nombre); 
    formData.append( 'apellido', apellido); 
    formData.append( 'email', email);
    formData.append( 'direccion', direccion); 
    formData.append( 'provincia', provincia);
    formData.append( 'localidad', localidad); 
    formData.append( 'codPostal', codPostal); 
    formData.append( 'password', password); 

    const url = `http://localhost:8000/usuarios`
    
    fetch(url, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    })
      .then((response)=> response.json())
      .then((data)=>{
        props.onPutSaved(data.message);
    });
  }


  const handlePutNombreChange = (event)=> {
    setNombre(event.target.value);
  }
  const handlePutApellidoChange = (event)=> {
    setApellido(event.target.value);
  }
  const handlePutEmailChange = (event)=> {
    setEmail(event.target.value);
  }
  const handlePutDireccionChange = (event)=> {
    setDireccion(event.target.value);
  }
  const handlePutProvinciaChange = (event)=> {
    setProvincia(event.target.value);
  }
  const handlePutLocalidadChange = (event)=> {
    setLocalidad(event.target.value);
  }
  const handlePutCodPostalChange = (event)=> {
    setCodPostal(event.target.value);
  }
  const handlePutPasswordChange = (event)=> {
    setPassword(event.target.value);
  }
  const handleUserSaved = (message) =>{

    Swal.fire({
      text: message,
      icon: 'success'
    })
  }


  return (
    <Container>
      <Row>
        <Col className="my-4">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={nombre} 
                onChange={handlePutNombreChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicSecondName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                value={apellido} 
                onChange={handlePutApellidoChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={handlePutEmailChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicStreet">
              <Form.Label>Direccion</Form.Label>
              <Form.Control 
                type="text" 
                value={direccion} 
                onChange={handlePutDireccionChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicState">
              <Form.Label>Provincia</Form.Label>
              <Form.Control 
                type="text" 
                value={provincia} 
                onChange={handlePutProvinciaChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicLocal">
              <Form.Label>Localidad</Form.Label>
              <Form.Control 
                type="text" 
                value={localidad} 
                onChange={handlePutLocalidadChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control 
                type="text" 
                value={codPostal} 
                onChange={handlePutCodPostalChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={handlePutPasswordChange}/>
            </Form.Group>
            <Button className="" variant="success" type="submit" onClick={handlePutUser} onUserSaved={handleUserSaved}>
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
