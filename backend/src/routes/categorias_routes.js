const express = require('express')
const connection = require('../connection')

const router = express.Router();

router.get('/', (req, res)=>{
  const sql = 'SELECT * FROM categorias ORDER BY nombre'

  connection.query(sql, (error, result)=>{
    if( error ){
      res.send('Error al obtener las cateogria')
    }else{
      res.json(result);
    }
  } )
})

router.get('/:id_categoria', (req,res)=> {
  const idCategoria = req.params.id_factura;

  const sql = 'SELECT * FROM categorias WHERE id_categoria = ?';

  connection.query(sql, [idCategoria] ,(error, result)=>{
    if( error ){
      res.send('Error al obtener la categoria')
    }else{
      res.json(result);
    }
  } )
})

router.post('/', (req,res)=> {
  
  const sql = `INSERT INTO 
               categorias (nombre) 
               VALUES (?)`;
  
  const nombre = req.body.nombre
  
  connection.query(sql, [nombre], (err, result)=> {
    if(err) {
      res.send('Error al insertar la categoria');
    }else{
      res.send('Categoria agregada')
    }
  });
});

router.put('/:id_categoria', (req,res)=> {
  const sql = `UPDATE categorias SET nombre=? WHERE id_categoria=?`;
  
  const nombre = req.body.nombre
  const id_categoria = req.params.id_categoria

  connection.query(sql, [nombre, id_categoria], (err, result)=> {
    if(err) {
      res.send('Error al modificar la categoria');
    }else{
      res.send('Categoria modificada')
    }
  });
})
router.delete('/:id_categoria', (req,res)=> {
  const sql = `DELETE FROM categorias WHERE id_categoria=?`;

  const id_categoria = req.params.id_cateogria;

  connection.query(sql, [id_categoria], (err, result)=>{
    if(err) {
        console.log(err);
      res.send('Error al eliminar la categoria');
    }else{
      res.send('Categoria eliminado')
    }
  })
})

module.exports = router;