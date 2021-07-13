import React, {useState} from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import {useParams} from 'react-router-dom';

import Swal from 'sweetalert2'

export default function ProfileEdit(props) {
  
  const {id} = useParams();
  
  const [usuario, setUsuario] = useState(null);

  async function cargarUsuario() {
    const url = 'http://localhost:8000/usuarios' + id

    const response = await fetch(url)
    const data = await response.json();

    
  }


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


  const handleNombreChange = (event)=> {
    setNombre(event.target.value);
  }
  const handleApellidoChange = (event)=> {
    setApellido(event.target.value);
  }
  const handleEmailChange = (event)=> {
    setEmail(event.target.value);
  }
  const handleDireccionChange = (event)=> {
    setDireccion(event.target.value);
  }
  const handleProvinciaChange = (event)=> {
    setProvincia(event.target.value);
  }
  const handleLocalidadChange = (event)=> {
    setLocalidad(event.target.value);
  }
  const handleCodPostalChange = (event)=> {
    setCodPostal(event.target.value);
  }
  const handlePasswordChange = (event)=> {
    setPassword(event.target.value);
  }
  
  return (
    <Container>
      <Row>
        <Col className="my-4">
          <h1>CREAR USUARIO</h1>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={nombre} 
                onChange={handleNombreChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                value={apellido} 
                onChange={handleApellidoChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cambiar E-Mail</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control 
                type="text" 
                value={direccion} 
                onChange={handleDireccionChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Provincia</Form.Label>
              <Form.Control 
                type="text" 
                value={provincia} 
                onChange={handleProvinciaChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Localidad</Form.Label>
              <Form.Control 
                type="text" 
                value={localidad} 
                onChange={handleLocalidadChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Código Postal</Form.Label>
              <Form.Control 
                type="text" 
                value={codPostal} 
                onChange={handleCodPostalChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cambiar Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={handlePasswordChange}/>
            </Form.Group>
            <Button className="" variant="success" type="submit" onClick={handlePutUser}>
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
