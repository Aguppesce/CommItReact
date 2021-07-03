const express = require("express");
const connection = require("../connection");

const router = express.Router();

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

router.get("/:id_mueble", (req, res) => {
  const idMueble = req.params.id_mueble;

  const sql = "SELECT * FROM productos WHERE id_mueble = ?";

  connection.query(sql, [idMueble], (error, result) => {
    if (error) {
      res.send("Error al obtener los productos");
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  const sql = `INSERT INTO 
               productos (nombre, imagen, precio, marca, 
               modelo, categoria, stock, descripcion) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const nombre = req.body.nombre;
  const imagen = req.body.imagen;
  const precio = req.body.precio;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const categoria = req.body.categoria;
  const stock = req.body.stock;
  const descripcion = req.body.descripcion;

  connection.query(
    sql,
    [nombre, imagen, precio, marca, modelo, categoria, stock, descripcion],
    (err, result) => {
      if (err) {
        res.send("Error al insertar el producto");
      } else {
        res.send("Producto agregado");
      }
    }
  );
});

router.put("/:id_mueble", (req, res) => {
  const sql = `UPDATE productos SET nombre=?, imagen=?, precio=?, marca=?, 
               modelo=?, categoria=?, stock=?, descripcion=? WHERE id_mueble=?`;

  const nombre = req.body.nombre;
  const imagen = req.body.imagen;
  const precio = req.body.precio;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const categoria = req.body.categoria;
  const stock = req.body.stock;
  const descripcion = req.body.descripcion;
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
      id_mueble,
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
