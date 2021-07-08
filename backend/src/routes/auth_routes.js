const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const conexion = require('../connection')

router.get('/check', (req, res) => {
  if(req.session.user){
    res.json({ message: 'Ok', data: req.session.user });
  }else{
    res.json({message: 'Error'})
  }
})

//Iniciar Sesión
router.post('/',(req,res)=>{

  console.log(req.body);

  const sql = `SELECT * 
               FROM usuarios
               WHERE email = ? OR usuario = ?
                 AND password = ?`

  conexion.query(sql,[req.body.user, req.body.email, req.body.password], (err,result)=>{
    if(err){
      console.log("Error al verificar el usuario")
    }else{
      if(result.length === 1){
        
        console.log(result);

        const nombreCompleto = `${result[0].nombre} ${result[0].apellido}`

        req.session.user = { 
          name: nombreCompleto,
          id_usuario: result[0].id_usuario
        };

        console.log(req.session.user);

        res.status(200).json({ message: 'Usuario valido!', data: nombreCompleto });    
      }else{
        res.status(401).json({ message: 'Email y/o contraseña incorrecta'})    
      }
    }
  })

  const emailValido = "pepe@gmail.com";
  const passwordValida = "1234";

  /* if( req.body.email === emailValido && req.body.password === passwordValida){
    res.json({ message: 'Usuario valido!'});
  }else{
    res.json({ message: 'Email y/o contraseña incorrecta'})
  }
  res.json({ message: 'Iniciar Sesión'}); */
});

//Cerrar Sesión
router.delete('/',(req,res)=>{

  req.session.destroy( (err)=>{
    if(err){
      res.status(500).json({ message: 'Error al cerrar la sesión' });
    }else{
      res.json({ message: 'Sesión Cerrada' })
    }
  })

})

module.exports = router;