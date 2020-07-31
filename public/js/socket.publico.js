var socket = io();

socket.on('estadoActual', (data) => {
    data.ultimos4.forEach((element, idx) => {
        console.log(element,idx)
        $(`#lblTicket${idx+1}`).text('Ticket: ' + element.numero)
        $(`#lblEscritorio${idx+1}`).text('Escritorio: ' + element.escritorio)
    });
})

// ultimos4

socket.on('ultimos4', (data) => {
    var sound = new Audio('audio/new-ticket.mp3');
    sound.play();
    data.ultimos4.forEach((element, idx) => {
        $(`#lblTicket${idx+1}`).text('Ticket: ' + element.numero)
        $(`#lblEscritorio${idx+1}`).text('Escritorio: ' + element.escritorio)
    });
})