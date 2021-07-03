const express = require('express')
const cors = require('cors')
const session = require('express-session');

const usuariosRoutes = require('./routes/usuarios_routes');
const productosRoutes = require('./routes/productos_routes');
const facturasRoutes = require('./routes/facturas_routes');
const categoriasRoutes = require('./routes/categorias_routes');
const authRoutes = require('./routes/auth_routes');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(
  session({
  secret: '123456', // escribir algo más seguro
  resave: false,
  saveUninitialized: true,
  })
);

app.use( express.static('public') )

app.use( express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/facturas', facturasRoutes);
app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(8000, () => {
  console.log('Servidor iniciado!')
});