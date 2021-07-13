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
  
  const values = [
    req.body.usuario,
    req.body.email,
    req.body.password
  ] 
  
  connection.query(sql, values, (err, result)=> {
    if (err) {
      console.log(err)
      res.json({
        status: 'error',
        message: 'Error al crear el usuario'
      });
    } else {
      res.json({
        status: 'ok',
        message: 'Cuenta creada'
      });
    }
  });

  /* conexion.query(sql,values,(err,result)=>{
    if(err){
      console.log("Error al crear el usuario")
    }else{
      if(result.length === 1){
        res.status(200).json({message: 'Usuario creado!'});
      }else{
        res.status(401).json({message: 'Datos incorrectos!'})
      }
    }
  }) */
  
});

router.put('/:id_usuario', (req,res)=> {
  const sqlUpdate = `UPDATE usuarios SET nombre=?, apellido=?, email=?, direccion=?, 
               provincia=?, localidad=?, cod_postal=?, password=? WHERE id_usuario=?`;
  
  let values = [
    req.body.nombre,
    req.body.apellido,
    req.body.email,
    req.body.direccion,
    req.body.provincia,
    req.body.localidad,
    req.body.cod_postal,
    req.body.password,
    req.params.id_usuario
  ]
  

  connection.query(sqlUpdate, values, [req.params.id_usuario], (err, result) => {
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