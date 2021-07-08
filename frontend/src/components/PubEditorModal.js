import React, {useState,useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function PubEditorModal(props) { 
  const [categorias, setCategorias] = useState([]);

  const [pubTitulo, setPubTitulo] = useState('')
  const [pubPrice, setPubPrice] = useState('')
  const [pubMarca, setPubMarca] = useState('')
  const [pubModelo, setPubModelo] = useState('')
  const [pubCategory, setPubCategory] = useState('')
  const [pubStock, setPubStock] = useState('')
  const [pubDescripcion, setPubDescripcion] = useState('')
  const [pubImage, setPubImage] = useState('');  
  const [previewPubImage, setPreviewPubImage] = useState('');
  

  useEffect(()=>{
      const url = 'http://localhost:8000/categorias'
    
      fetch(url)
        .then((response)=> response.json())
        .then((data)=> { 
            setCategorias(data)
        });
    },[]);
  
  function getCategoriesOptions() {
    return categorias.map((categoria)=> (
      <option value={categoria.id_categoria}>{categoria.nombre}</option>
      ));    
  }

  const handlePubTituloChange = (event)=> {
    setPubTitulo(event.target.value);
  }

  const handlePubPriceChange = (event)=> {
    setPubPrice(event.target.value);
  }

  const handlePubMarcaChange = (event)=> {
    setPubMarca(event.target.value);
  }

  const handlePubModeloChange = (event)=> {
    setPubModelo(event.target.value);
  }

  const handleCategoryChange = (event)=> {
    setPubCategory(event.target.value);
  }

  const handlePubStockChange = (event)=> {
    setPubStock(event.target.value);
  }

  const handlePubDescripcionChange = (event)=> {
    setPubDescripcion(event.target.value);
  }

  const handlePubImageChange = (event)=> {
    setPubImage(event.target.files[0]);

    setPreviewPubImage(URL.createObjectURL(event.target.files[0]));
  }

  const handleSave = ()  => {
    const formData = new FormData();

    formData.append( 'pubTitulo', pubTitulo);
    formData.append( 'pubPrice', pubPrice);
    formData.append( 'pubMarca', pubMarca);
    formData.append( 'pubModelo', pubModelo);
    formData.append( 'pubCategory', pubCategory);
    formData.append( 'pubStock', pubStock);
    formData.append( 'pubDescripcion', pubDescripcion);
    formData.append( 'pubImage', pubImage);
    
    let url, method;

    if(props.idPub){
      //Modo Edicion
      url = `http://localhost:8000/productos/${props.idPub}`
      method = 'PUT'
    }else{
      //Modo Nuevo
      url = `http://localhost:8000/productos`
      method = 'POST'
    }

    fetch(url, {
      method: method,
      body: formData,
      credentials: 'include'
    })
      .then((response)=> response.json())
      .then((data)=>{
        props.onPubSaved(data.message);
    });
  }

  
  useEffect(() => {
      if(props.idPub){
        console.log('Modo Edición')
        const url = `http://localhost:8000/productos/${props.idPub}`;
        //Al editar una publicación se cargan los valores del producto seleccionado
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
            setPubTitulo(data.nombre);
            setPubPrice(data.precio)
            setPubMarca(data.marca)
            setPubModelo(data.modelo)
            setPubStock(data.stock)
            setPubDescripcion(data.descripcion)
            setPubImage('')
            setPreviewPubImage(`http://localhost:8000/images/${data.imagen}`)
            setPubCategory(data.id_categoria) 
          })
      }else{
        //Al crear una nueva publicación se ponen los formularios en blanco
        console.log('Modo nuevo')
        setPubTitulo('')
        setPubPrice('')
        setPubMarca('')
        setPubModelo('')
        setPubCategory('')
        setPubStock('')
        setPubDescripcion('')
        setPubImage('')
        setPreviewPubImage('')
      }
    },[props.idPub])

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>Publicación</Modal.Header>
    
      <Modal.Body>
        <Form>
          
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text" 
              value={pubTitulo}            
              onChange={handlePubTituloChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control 
              type="text"
              value={pubPrice}
              onChange={handlePubPriceChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Control 
              type="text"
              value={pubMarca}
              onChange={handlePubMarcaChange}
              ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo</Form.Label>
            <Form.Control 
              type="text"
              value={pubModelo}
              onChange={handlePubModeloChange}
              ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control 
              as="select" 
              value={pubCategory} 
              onChange={handleCategoryChange}
              >{getCategoriesOptions()}</Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control 
              type="text"
              value={pubStock}
              onChange={handlePubStockChange}
              ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control 
              type="text"
              value={pubDescripcion}
              onChange={handlePubDescripcionChange}
              ></Form.Control>
          </Form.Group>
          
          <Form.Group className="d-flex justify-content-center">
            {previewPubImage && (
              <img 
                style={{ height: '25vh' }} src={ previewPubImage }/>)}
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control 
              type="file"
              onChange={handlePubImageChange}/>
          </Form.Group>          

        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHide}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </Modal.Footer>

    </Modal>
  );
}
