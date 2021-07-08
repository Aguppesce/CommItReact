const express = require("express");
const connection = require("../connection");
const path = require('path');
const fs = require('fs');

const router = express.Router();

//MOSTRAR TODOS LOS PRODUCTOS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM productos";

  connection.query(sql, (error, result) => {
    if (error) {
      res.send("Error al obtener los productos");
    } else {
      res.json(result);
    }
  });
});

//MOSTRAR PRODUCTOS O PUBLICACIONES DE UN USUARIO
router.get("/userpubs", (req, res) => {
  console.log(req.session.user.id_usuario);

  const sql= `SELECT * FROM productos WHERE id_usuario = ?`

  connection.query(sql, [req.session.user.id_usuario], (err,result)=>{
    if(err) {
      res.send('Error al obtener las publicaciones del usuario')
    }else{
      res.json(result);
    }
  })
});


//MOSTRAR UN PRODUCTO ESPECÍFICO
router.get("/:id_mueble", (req, res) => {
  const idMueble = req.params.id_mueble;

  const sql = "SELECT * FROM productos WHERE id_mueble = ?";

  connection.query(sql, [idMueble], (error, result) => {
    if (error) {
      res.send("Error al obtener el producto");
    } else {
      res.json(result[0]);
    }
  });
});


//AGREGAR
router.post("/", (req, res) => {  
  
  let imageFileName = ''

  if (req.files){
    const pubImage = req.files.pubImage;
    
    imageFileName = Date.now() + path.extname(pubImage.name);

    console.log(imageFileName)

    pubImage.mv(`./public/images/${imageFileName}`, (err)=>{
      if(err){
        console.log(err);
      }
    });
  }else{
    console.log('No hay archivo')
  }

  const sql = `INSERT INTO 
               productos (nombre, imagen, precio, marca, 
               modelo, id_categoria, stock, descripcion, id_usuario) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    req.body.pubTitulo,
    imageFileName,
    req.body.pubPrice,
    req.body.pubMarca,
    req.body.pubModelo,
    req.body.pubCategory,
    req.body.pubStock,
    req.body.pubDescripcion,    
    req.session.user.id_usuario,    
  ]

  connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err)
        res.json({
          status: 'error',
          message: 'Error al realizar la publicación'
        });
      } else {
        res.json({
          status: 'ok',
          message: 'Publicacion exitosa'
        });
      }
    });
});

//MODIFICAR
router.put("/:id_mueble", (req, res) => {
  let sqlUpdate = `UPDATE productos SET nombre = ?, precio = ?, marca = ?, 
               modelo = ?, id_categoria = ?, stock = ?, descripcion = ?`;

  let values = 
    [req.body.pubTitulo,
     req.body.pubPrice,
     req.body.pubMarca,
     req.body.pubModelo,
     req.body.pubCategory,
     req.body.pubStock,
     req.body.pubDescripcion,
     ]
    
  if ( req. files ){
    //Averiguamos cual es el nombre del archivo de la imagen actual
    const sqlCurrentImage = `SELECT imagen FROM productos WHERE id_mueble = ?`

    connection.query(sqlCurrentImage,[req.params.id_mueble], (err,result)=>{
      if(err){
        console.log(err);
      }else{
        //Borrar archivo de la imagen actual
        const fileToDelete = `./public/images/${result[0].imagen}`
        fs.unlink(fileToDelete, (err)=>{
          if(err){
            console.log('Error al borrar el archivo')
          }else{
            console.log('Archivo borrado')
          }
        })
      }
    })
    
    //Obtenemos la nueva imagen
    const pubImage = req.files.pubImage;

    imageFileName = Date.now() + path.extname(pubImage.name);

    console.log(imageFileName);

    pubImage.mv(`./public/images/${imageFileName}`,(err)=>{
      if(err) {
        console.log(err);
      }
    });
    sqlUpdate += ', imagen = ?';
    values.push(imageFileName);
  }
  sqlUpdate += ' WHERE id_mueble = ?';
  values.push(req.params.id_mueble);
  
  connection.query(sqlUpdate, values, (err,result)=>{
    if(err) {
      res.json({
        status: 'error',
        message: 'Error al modificar la publicación',
      })
    }else{
      res.json({
        status: 'ok',
        message: 'Se modifico correctamente',
      })
    }
  })
});

router.delete("/:id_mueble", (req, res) => {

  const sqlCurrentImage = `SELECT imagen FROM productos WHERE id_mueble = ?`

    connection.query(sqlCurrentImage,[req.params.id_mueble], (err,result)=>{
      if(err){
        console.log(err);
      }else{
        //Borrar archivo de la imagen actual
        const fileToDelete = `./public/images/${result[0].imagen}`
        fs.unlink(fileToDelete, (err)=>{
          if(err){
            console.log('Error al borrar el archivo')
          }else{
            console.log('Archivo borrado')
          }
        })
      }
    })

  const sql = `DELETE FROM productos WHERE id_mueble = ?`;

  const id_mueble = req.params.id_mueble;

  connection.query(sql, [id_mueble], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error al eliminar el producto");
    } else {
      res.send("Producto eliminado");
    }
  });
});


module.exports = router;
