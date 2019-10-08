module.exports = function(io) {
    return function(socket) {
        console.log('Un client est connecté !');

        socket.on('message', function (message) {
            console.log('message reçu : ' + message);
            io.emit('broadcast_message', message);
        });
    };
};