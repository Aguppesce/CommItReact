import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/col'
import Button from 'react-bootstrap/Button'

export default function NavBarMisPublicaciones(props) {
  return ( 
    <Row className="my-3 ml-3">
      <Col>
        <Button onClick={props.onNewPubClick}>Nueva Publicacion</Button>
      </Col>

    </Row>
  );
}
