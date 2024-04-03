let playersInRoom = {}

function listen(io) {
  const pongNamespace = io.of('/');

  pongNamespace.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    playersInRoom[socket.id] = socket.id
    let room = 0;
    
    socket.on("ready", () => {
      socket.broadcast.emit('player connected', socket.id);
      socket.emit('ready', playersInRoom);
    })

    socket.on('keyup', (key) => {
      let args = {
        socketID: socket.id,
        key: key
      }

      socket.broadcast.emit('keyup', args);
    })
    socket.on('keydown', (key) => {
      let args = {
        socketID: socket.id,
        key: key
      }

      socket.broadcast.emit('keydown', args);
    })
    socket.on('move', (position, rotation) => {
      let args = {
        position: position,
        rotation: rotation,
        socketID: socket.id
      }
      
      socket.broadcast.emit('move', args);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);

      socket.broadcast.emit('player disconnected', socket.id);
      delete playersInRoom[socket.id]
    });

  })
}

module.exports = {
  listen,
};
