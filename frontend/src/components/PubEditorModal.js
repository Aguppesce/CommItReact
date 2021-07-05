import React, {useState,useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function PubEditorModal(props) { 
  const [categorias, setCategorias] = useState([]);

  useEffect(()=>{
      const url = 'http://localhost:8000/categorias'
    
      fetch(url)
        .then((response)=> response.json())
        .then((data)=> { 
            setCategorias(data)
        });
    },[]);
  
  function getCategoriesOptions() {
    return categorias.map((categoria)=> <option value={categoria.id_categoria}>{categoria.nombre}</option>);    
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>Publicación</Modal.Header>
    
      <Modal.Body>
        <Form>
          
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          
          <Form.Group className="d-flex justify-content-center">
            <img 
              style={{ height: '25vh' }} 
              src="http://localhost:8000/images/armariolatika.webp" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control as="select">{getCategoriesOptions()}</Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file"/>
          </Form.Group>

        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHide}>Cancelar</Button>
        <Button>Guardar</Button>
      </Modal.Footer>

    </Modal>
  );
}
