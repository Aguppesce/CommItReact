import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Swal from 'sweetalert2'

export default function Register(props) {
  
  const [pubUser, setPubUser] = useState('');
  const [pubNombre, setPubNombre] = useState('');
  const [pubApellido, setPubApellido] = useState('');
  const [pubEmail, setPubEmail] = useState('');
  const [pubDireccion, setPubDireccion] = useState('');
  const [pubProvincia, setPubProvincia] = useState('');
  const [pubLocalidad, setPubLocalidad] = useState('');
  const [pubCodPostal, setPubCodPostal] = useState('');
  const [pubPassword, setPubPassword] = useState('');
  

  const handlePostUser = ()  => {
    const formData = new FormData();

    formData.append( 'pubUser', pubUser);    
    formData.append( 'pubNombre', pubNombre); 
    formData.append( 'pubApellido', pubApellido); 
    formData.append( 'pubEmail', pubEmail);
    formData.append( 'pubDireccion', pubDireccion); 
    formData.append( 'pubProvincia', pubProvincia);
    formData.append( 'pubLocalidad', pubLocalidad); 
    formData.append( 'pubCodPostal', pubCodPostal); 
    formData.append( 'pubPassword', pubPassword); 

    const url = `http://localhost:8000/usuarios`
    
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then((response)=> response.json())
      .then((data)=>{
        props.onPubSaved(data.message);
    });
  }

      

  const handlePubUserChange = (event)=> {
    setPubUser(event.target.value);
  }
  const handlePubNombreChange = (event)=> {
    setPubNombre(event.target.value);
  }
  const handlePubApellidoChange = (event)=> {
    setPubApellido(event.target.value);
  }
  const handlePubEmailChange = (event)=> {
    setPubEmail(event.target.value);
  }
  const handlePubDireccionChange = (event)=> {
    setPubDireccion(event.target.value);
  }
  const handlePubProvinciaChange = (event)=> {
    setPubProvincia(event.target.value);
  }
  const handlePubLocalidadChange = (event)=> {
    setPubLocalidad(event.target.value);
  }
  const handlePubCodPostalChange = (event)=> {
    setPubCodPostal(event.target.value);
  }
  const handlePubPasswordChange = (event)=> {
    setPubPassword(event.target.value);
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
          <Form.Group controlId="formBasicUser">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control 
                type="text" 
                value={pubUser} 
                onChange={handlePubUserChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={pubNombre} 
                onChange={handlePubNombreChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicSecondName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                value={pubApellido} 
                onChange={handlePubApellidoChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control 
                type="email" 
                value={pubEmail} 
                onChange={handlePubEmailChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicStreet">
              <Form.Label>Direccion</Form.Label>
              <Form.Control 
                type="text" 
                value={pubDireccion} 
                onChange={handlePubDireccionChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicState">
              <Form.Label>Provincia</Form.Label>
              <Form.Control 
                type="text" 
                value={pubProvincia} 
                onChange={handlePubProvinciaChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicLocal">
              <Form.Label>Localidad</Form.Label>
              <Form.Control 
                type="text" 
                value={pubLocalidad} 
                onChange={handlePubLocalidadChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control 
                type="text" 
                value={pubCodPostal} 
                onChange={handlePubCodPostalChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={pubPassword} 
                onChange={handlePubPasswordChange}/>
            </Form.Group>
            <Button className="" variant="success" type="submit" onClick={handlePostUser} onUserSaved={handleUserSaved}>
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




const express = require('express')
const connection = require('../connection')

const router = express.Router();

router.get('/', (req, res)=>{
  const sql = 'SELECT * FROM usuarios'

  connection.query(sql, (error, result)=>{
    if( error ){
      res.send('Error al obtener los usuarios')
    }else{
      res.json(result);
    }
  } )
})

router.get('/:id_usuario', (req,res)=> {
  const idUsuario = req.params.id_usuario;

  const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';

  connection.query(sql, [idUsuario] ,(error, result)=>{
    if( error ){
      res.send('Error al obtener los usuarios')
    }else{
      res.json(result);
    }
  } )
})

router.post('/', (req,res)=> {
  
  const sql = `INSERT INTO 
               usuarios (usuario, nombre, apellido, email, direccion, 
               provincia, localidad, cod_postal, password) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    req.body.pubUsuario,
    req.body.pubNombre,
    req.body.pubApellido,
    req.body.pubEmail,
    req.body.pubDireccion,
    req.body.pubProvincia,
    req.body.pubLocalidad,
    req.body.pubCodPostal,
    req.body.pubPassword,
  ]  

  connection.query(sql, values, (err, result)=> {
    if (err) {
      console.log(err)
      res.json({ 
        status: 'error',
        message: 'Error al agregar usuario'
      })
    }else{
      res.json({ 
        status: 'ok',
        message: 'Usuario agregado'
      })
    }
  });
});

router.put('/:id_usuario', (req,res)=> {
  const sql = `UPDATE usuarios SET usuario=?, nombre=?, apellido=?, email=?, direccion=?, 
               provincia=?, localidad=?, cod_postal=?, password=? WHERE id_usuario=?`;
  
  const usuario = req.body.usuario
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const email = req.body.email
  const direccion = req.body.direccion
  const provincia = req.body.provincia
  const localidad = req.body.localidad
  const cod_postal = req.body.cod_postal
  const password = req.body.password
  const id_usuario = req.params.id_usuario

  connection.query(sql, [usuario, nombre, apellido, email, direccion, provincia, localidad, cod_postal, password, id_usuario], (err, result)=> {
    if(err) {
      res.send('Error al modificar el usuario');
    }else{
      res.send('Usuario modificado')
    }
  });
})
router.delete('/:id_usuario', (req,res)=> {
  const sql = `DELETE FROM usuarios WHERE id_usuario=?`;

  const id_usuario = req.params.id_usuario;

  connection.query(sql, [id_usuario], (err, result)=>{
    if(err) {
        console.log(err);
      res.send('Error al eliminar el usuario');
    }else{
      res.send('Usuario eliminado')
    }
  })
})

module.exports = router;



fetch(url, {
  method: 'POST',
  body: formData,
  headers: { "Content-Type": "application/json" },
  credentials: 'include'
})
  .then((response)=> response.json())
  .then((data)=>{
    setUsuarios(data.data);
});


const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(params),
  headers: { "Content-Type": "application/json"},
  credentials: 'include'
});

const data = await response.json();

if (response.status === 200) {
  props.setUsuarios({ name: data.data });
} else {
  alert(data.message);
}
console.log(data);