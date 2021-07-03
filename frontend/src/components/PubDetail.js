import React, { useEffect } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom';

export default function PubDetail() {
  const {id} = useParams();

  console.log('id param', id)

  useEffect( cargarDetalle )

  function cargarDetalle() {
    const url = 'http://localhost:8000/publicaciones'
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md={4} className="d-flex justify-content-center">
        <img src="http://localhost:8000/images/armariolatika.webp"></img>
      </Col>
      <Col md={4}>
        <h2>Título</h2>
        <h3>Precio</h3>
      </Col>      
    </Row>
      
      
    
  )
}
