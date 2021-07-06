import React, { useEffect, useState } from 'react'
import PubCard from './PubCard'
import Row from 'react-bootstrap/Row'
import NavBarMisPublicaciones from './NavBarMisPublicaciones'
import PubEditorModal from './PubEditorModal'

import Swal from 'sweetalert2'

export default function PubsList(props) {

  const [productos, setProductos] = useState([]);

  const [showPubEditorModal, setShowPubEditorModal] = useState(false)
  const [selectedPub, setSelectedPub] = useState(null);

  useEffect(getPubs, [props.type]);

  async function getPubs () {
    let url = 'http://localhost:8000/productos';
    
    if(props.type === 'mispublicaciones') {
      url+= '/userpubs';
    }else if (props.type == 'favoritos') {
      url+= '/favoritos'
    }
    /*switch( props.type ) {
      case 'mispublicaciones':
        url+= '/userpubs';
        break;      
      case 'favoritos':
        url+= '/favoritos';
    } */

    const response = await fetch(url, {credentials: 'include'});
    const data = await response.json()

    setProductos(data);
  }

  function getCards(){
    
    const cards = productos.map((producto)=>{
      return (
        <PubCard 
          nombre={producto.nombre} 
          precio={producto.precio} 
          marca={producto.marca} 
          modelo={producto.modelo} 
          categoria={producto.categoria} 
          stock={producto.stock}
          imagen={producto.imagen}
          id_mueble={producto.id_mueble}
          type={props.type}
          onEditClick = {handleEditClick}
        />
      );
    })    

    
    return cards;
  }

  const handleShowPubEditorModal = () => {
    setSelectedPub(null);
    setShowPubEditorModal(true);
  };

  const handleHidePubEditorModal = () => {
    setShowPubEditorModal(false);
  }

  const handlePubSaved = (message) => {
    getPubs();
    handleHidePubEditorModal();

    Swal.fire({ 
      text: message,
      icon: 'success'      
    })
  }

  const handleEditClick = (idPub) => {
    console.log('Cargar los datos de la publicación ' + idPub)

    setSelectedPub(idPub);

    setShowPubEditorModal(true);
  }
  return (  
    <>
      {props.type === 'mispublicaciones' && (
        <NavBarMisPublicaciones onNewPubClick={handleShowPubEditorModal} />)}
      
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-5">
        {getCards()}    
      </Row>

      <PubEditorModal 
        show={showPubEditorModal} 
        handleHide={handleHidePubEditorModal}
        onPubSaved={handlePubSaved}
        idPub={selectedPub}
        />
    </>
  );
}
