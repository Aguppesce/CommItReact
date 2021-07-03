import React from "react";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col'

export default function PubCard(props) {

  const imageUrl = `http://localhost:8000/images/${props.imagen}`

  const cardImageStyle = {
    height: '40vh',
    objetFit: 'contain',
  }

  return (
    <Col className="my-4">
      <Card className="h-10">
        <Card.Img 
          style={cardImageStyle}
          variant="top" 
          src={imageUrl}/>
        <Card.Body>
          <Card.Title>{props.nombre} {props.marca} {props.modelo}</Card.Title>
          <Card.Title>{props.categoria}</Card.Title>
          <Card.Text>{props.descripcion}</Card.Text>
          <Card.Text>Stock: {props.stock}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">${props.precio}</Card.Footer>
      </Card>
    </Col>
  );
}
