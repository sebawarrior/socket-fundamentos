var socket = io();

// on: Escuchar informacion

socket.on('connect', function(){
    console.log('Conectado al servidor')
});

socket.on('disconnect', function(){
    console.log('Perdimos conexion con el servidor')
});

// emit: Enviar informacion. El primer argumento es el nombre de la info que emito
// el emit puede recibir como tercer argumento un callback para hacer algo cuando se haya recibido el mensaje
// Este "algo" se ejecuta en el lado del cliente (web)

socket.emit('enviarMensaje', {
    usuario: 'Sebastian',
    mensaje: 'Hola Mundo'
}, function(resp){
    console.log('Respuesta del server: ', resp)
})

// Escuchar información
socket.on('enviarMensaje', function(mensaje){
    console.log('Servidor: ', mensaje)
})