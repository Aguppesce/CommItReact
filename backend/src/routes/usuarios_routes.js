const express = require('express')
const connection = require('../connection')

const router = express.Router();

router.get('/', (req, res)=>{
  const sql = 'SELECT * FROM usuarios'

  connection.query(sql, (error, result)=>{
    if( error ){
      res.send('Error al obtener los usuarios')
    }else{
      res.json(result);
    }
  } )
})

router.get('/:id_usuario', (req,res)=> {
  const idUsuario = req.params.id_usuario;

  const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';

  connection.query(sql, [idUsuario] ,(error, result)=>{
    if( error ){
      res.send('Error al obtener los usuarios')
    }else{
      res.json(result);
    }
  } )
})

router.post('/', (req,res)=> {
  
  const sql = `INSERT INTO 
               usuarios (usuario, email, password) 
               VALUES (?, ?, ?)`;
  
  const usuario = req.body.usuario
  const email = req.body.email
  const password = req.body.password

  connection.query(sql, [usuario, email, password], (err, result)=> {
    if (err) {
      console.log(err)
      res.json({
        status: 'error',
        message: 'Error al cargar el usuario'
      });
    } else {
      res.json({
        status: 'ok',
        message: 'Registro exitosa'
      });
    }
  });
});

router.put('/:id_usuario', (req,res)=> {
  const sql = `UPDATE usuarios SET usuario=?, nombre=?, apellido=?, email=?, direccion=?, 
               provincia=?, localidad=?, cod_postal=?, password=? WHERE id_usuario=?`;
  
  const usuario = req.body.usuario
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const email = req.body.email
  const direccion = req.body.direccion
  const provincia = req.body.provincia
  const localidad = req.body.localidad
  const cod_postal = req.body.cod_postal
  const password = req.body.password
  const id_usuario = req.params.id_usuario

  connection.query(sql, [usuario, nombre, apellido, email, direccion, provincia, localidad, cod_postal, password, id_usuario], (err, result)=> {
    if(err) {
      res.send('Error al modificar el usuario');
    }else{
      res.send('Usuario modificado')
    }
  });
})
router.delete('/:id_usuario', (req,res)=> {
  const sql = `DELETE FROM usuarios WHERE id_usuario=?`;

  const id_usuario = req.params.id_usuario;

  connection.query(sql, [id_usuario], (err, result)=>{
    if(err) {
        console.log(err);
      res.send('Error al eliminar el usuario');
    }else{
      res.send('Usuario eliminado')
    }
  })
})

module.exports = router;