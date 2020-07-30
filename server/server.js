
// ================================
//  Configurar el start en package.json!!
// ================================

// "start": "node server/server.js" -> Con esto heroku sabe cuál es el archivo que tiene que ejecutar
// ================================

const express = require('express');
const app = express();
const http = require('http');
let server = http.createServer(app);
const path = require('path');

const socketIO = require('socket.io');


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket')

// http://localhost:3000/socket.io/socket.io.js -> Si al abrir esto vemos una libreria entonces esta bien instalado

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});