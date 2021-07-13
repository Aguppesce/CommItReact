import React, {useState} from 'react'

export default function Footer(props){
  const [saludo,setSaludo] = useState('Hola');

  function cambiarSaludo() {
    setSaludo(saludo + 'Chau');
  }
  return (
    <footer>
      <ul>
        <li>Dirección: {props.empresa.direccion}</li>
        <li>Teléfono: {props.empresa.telefono}</li>
        <li>{saludo}</li>
        
      </ul>
      <button onClick={cambiarSaludo}>Cambiar Saludo</button>
    </footer>
  )
}
