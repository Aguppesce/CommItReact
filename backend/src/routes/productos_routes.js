const express = require("express");
const connection = require("../connection");

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
  const sql = `INSERT INTO 
               productos (nombre, imagen, precio, marca, 
               modelo, id_categoria, stock, descripcion, id_usuario) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const nombre = req.body.nombre;
  const imagen = req.body.imagen;
  const precio = req.body.precio;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const categoria = req.body.id_categoria;
  const stock = req.body.stock;
  const descripcion = req.body.descripcion;
  const id_usuario = req.body.id_usuario;
  

  connection.query(
    sql,
    [nombre, imagen, precio, marca, modelo, categoria, stock, descripcion, id_usuario],
    (err, result) => {
      if (err) {
        res.send("Error al insertar el producto");
      } else {
        res.send("Producto agregado");
      }
    }
  );
});

//MODIFICAR
router.put("/:id_mueble", (req, res) => {
  const sql = `UPDATE productos SET nombre=?, imagen=?, precio=?, marca=?, 
               modelo=?, id_categoria=?, stock=?, descripcion=?, id_usuario=? WHERE id_mueble=?`;

  const nombre = req.body.nombre;
  const imagen = req.body.imagen;
  const precio = req.body.precio;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const categoria = req.body.id_categoria;
  const stock = req.body.stock;
  const descripcion = req.body.descripcion;
  const id_usuario = req.body.id_usuario;
  const id_mueble = req.params.id_mueble;

  connection.query(
    sql,
    [
      nombre,
      imagen,
      precio,
      marca,
      modelo,
      categoria,
      stock,
      descripcion,
      id_usuario,
      id_mueble
      
    ],
    (err, result) => {
      if (err) {
        res.send("Error al modificar el producto");
      } else {
        res.send("Producto modificado");
      }
    }
  );
});

router.delete("/:id_mueble", (req, res) => {
  const sql = `DELETE FROM productos WHERE id_mueble=?`;

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
