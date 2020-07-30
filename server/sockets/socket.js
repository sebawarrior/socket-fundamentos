
const {io} = require('../server')

// Con esto identifico cuando un cliente accede a la conexion
io.on('connection', (client) => {

    console.log('usuario conectado');
    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicación'
    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    // Escuchar cliente
    // el primer argumento acá es el nombre de la info que el cliente emitió
    // el segundo argumento es el callback de lo que el cliente quiere que haga cuando recibo el mensaje (avisarle, por ejemplo)
    client.on('enviarMensaje', (data, callback) => {
        
        console.log(data)

        //Con esto solo el cliente que emitió el mensaje recibe una respuesta
        //client.emit('enviarMensaje', data)

        //Con esto, el mensaje enviado de un cliente se lo mandamos a todos
        client.broadcast.emit('enviarMensaje', data)

        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     })
        // }
        // else{
        //     callback({
        //         resp: 'TODO SALIO MAAL!!'
        //     });
        // }

    })

})