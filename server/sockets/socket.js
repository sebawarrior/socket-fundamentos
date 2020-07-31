
const {io} = require('../server')
const {TicketControl} = require('../classes/ticket-control')


const ticketControl = new TicketControl();

module.exports = ticketControl;

// Con esto identifico cuando un cliente accede a la conexion
io.on('connection', (client) => {

    console.log('usuario conectado');
    // client.emit('enviarMensaje', {
    //     usuario: 'Admin',
    //     mensaje: 'Bienvenido a esta aplicación'
    // })

    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    // Escuchar cliente
    // el primer argumento acá es el nombre de la info que el cliente emitió
    // el segundo argumento es el callback de lo que el cliente quiere que haga cuando recibo el mensaje (avisarle, por ejemplo)
    client.on('siguienteTicket', (data, callback) => {
        siguiente = ticketControl.siguiente()
        console.log(siguiente)
        // nodemon server/server -e js,html -> con esto nodemon solo se resetea ante cambios en archivos html y js
        callback(siguiente)

    })

    //emitir un evento estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // acrtualizar /notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {ultimos4: ticketControl.ultimos4})

    })

})