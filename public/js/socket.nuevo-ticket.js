
// Comando para establecer la conexion
var socket = io();
//const {TicketControl} = require('./../../server/classes/ticket-control')

var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Me conecté como usuario')
})

socket.on('disconnect', () => {
    console.log('Me desconecté como usuario')
})

// socket.on('enviarMensaje', (data, callback) => {
//     console.log('Admin me dice: ', data)
// })

socket.on('estadoActual', (data) => {
    label.text(data.actual)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket)
    })
})
