import React, { useEffect, useState } from 'react'
import PubCard from './PubCard'
import Row from 'react-bootstrap/Row'

export default function PubsList() {

  const [productos, setProductos] = useState([]);

  useEffect(getPubs, []);

  async function getPubs () {
    const url = 'http://localhost:8000/productos';
    
    const response = await fetch(url);
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
          imagen={producto.imagen}/>
      );
    })    

    return cards;
  }

  return (  
  <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-5">
    {getCards()}    
  </Row>
  );
}
