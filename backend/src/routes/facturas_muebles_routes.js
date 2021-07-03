const express = require('express')
const connection = require('../connection')

const router = express.Router();

router.get('/', (req, res)=>{
  const sql = 'SELECT * FROM facturas'

  connection.query(sql, (error, result)=>{
    if( error ){
      res.send('Error al obtener las facturas')
    }else{
      res.json(result);
    }
  } )
})

router.get('/:id_factura', (req,res)=> {
  const idFactura = req.params.id_factura;

  const sql = 'SELECT * FROM facturas WHERE id_factura = ?';

  connection.query(sql, [idFactura] ,(error, result)=>{
    if( error ){
      res.send('Error al obtener los productos')
    }else{
      res.json(result);
    }
  } )
})

router.post('/', (req,res)=> {
  
  const sql = `INSERT INTO 
               facturas (fecha, total_venta, id_usuario) 
               VALUES (?, ?, ?)`;
  
  const fecha = req.body.fecha
  const total_venta = req.body.total_venta
  const id_usuario = req.body.id_usuario
  

  connection.query(sql, [fecha, total_venta, id_usuario], (err, result)=> {
    if(err) {
      res.send('Error al insertar la factura');
    }else{
      res.send('Factura agregada')
    }
  });
});

router.put('/:id_factura', (req,res)=> {
  const sql = `UPDATE facturas SET fecha=?, total_venta=?, id_usuario=? WHERE id_factura=?`;
  
  const fecha = req.body.fecha
  const total_venta = req.body.total_venta
  const id_usuario = req.body.id_usuario
  const id_factura = req.params.id_factura

  connection.query(sql, [fecha, total_venta, id_usuario, id_factura], (err, result)=> {
    if(err) {
      res.send('Error al modificar la factura');
    }else{
      res.send('Factura modificada')
    }
  });
})
router.delete('/:id_factura', (req,res)=> {
  const sql = `DELETE FROM facturas WHERE id_factura=?`;

  const id_factura = req.params.id_factura;

  connection.query(sql, [id_factura], (err, result)=>{
    if(err) {
        console.log(err);
      res.send('Error al eliminar la factura');
    }else{
      res.send('Factura eliminado')
    }
  })
})

module.exports = router;