const http = require('http');
const path = require('path');
const express = require("express");
const socketio = require('socket.io');
const formatMessage = require("./utils/formatMessage.js");
const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  removePlayer,
} = require("./utils/players.js");
const { setGame, setGameStatus, getGameStatus } = require("./utils/game.js");


/***********************************|
|             CONFIG                |
|__________________________________*/
const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;
const app = express();
const trivia_server = http.createServer( app ); // create the HTTP server using the Express app created on the previous line
const io = socketio( trivia_server ); // connect Socket.IO to the HTTP server





/***********************************|
|           MIDDLEWARE              |
|__________________________________*/
app.use( express.static( PUBLIC_DIR_PATH ) );





/***********************************|
|              EVENTS               |
|__________________________________*/
const onJoin = ( socket ) => 
{
    socket.on('join', ({ playerName, room }, callback) => 
    {
        const { error, newPlayer } = addPlayer({ id: socket.id, playerName, room });
    
        if ( error ) return callback(error.message);
        callback(); // The callback can be called without data.
    
        socket.join(newPlayer.room);
    
        socket.emit('message', formatMessage('Admin', 'Welcome!'));

        socket.broadcast.to(newPlayer.room).emit(
            'message',
            formatMessage('Admin', `${newPlayer.playerName} has joined the game!`)
        );

        // Emit a "room" event to all players to update their Game Info sections
        io.in(newPlayer.room).emit('room', {
            room: newPlayer.room,
            players: getAllPlayers(newPlayer.room),
        });
    });
}

const onDisconnect = ( socket ) =>
{
    socket.on("disconnect", () => 
    {
        console.log("A player disconnected.");
      
        const disconnectedPlayer = removePlayer( socket.id );
      
        if ( disconnectedPlayer ) 
        {
          const { playerName, room } = disconnectedPlayer;
          io.in(room).emit(
            "message",
            formatMessage("Admin", `${ playerName } has left!`)
          );
      
          io.in(room).emit("room", {
            room,
            players: getAllPlayers(room),
          });
        }
    });
}

const onSendMessage = ( socket ) =>
{
    socket.on("sendMessage", (message, callback) => 
    {
        const { error, player } = getPlayer(socket.id);
      
        if ( error ) return callback(error.message);
      
        if ( player ) 
        {
            io.to(player.room).emit(
                "message",
                formatMessage(player.playerName, message)
            );
            callback(); // invoke the callback to trigger event acknowledgment
        }
    });
}

const onGetQuestion = ( socket ) =>
{
    socket.on("getQuestion", async(data, callback) => 
    {
        const { error, player } = getPlayer(socket.id);
      
        if (error) return callback(error.message);
      
        if ( player ) 
        {
            const game = await setGame();
            io.to(player.room).emit('question', {
              playerName: player.playerName,
              ...game.prompt,
            });
        }
    });
}

const onSentAnswer = ( socket ) =>
{
    socket.on("sendAnswer", (answer, callback) => 
    {
        const { error, player } = getPlayer(socket.id);
      
        if (error) return callback(error.message);
      
        if (player) {
          const { isRoundOver } = setGameStatus({
            event: "sendAnswer",
            playerId: player.id,
            room: player.room,
          });
      
          // Since we want to show the player's submission to the rest of the players,
          // we have to emit an event (`answer`) to all the players in the room along
          // with the player's answer and `isRoundOver`.
          io.to(player.room).emit("answer", {
            ...formatMessage(player.playerName, answer),
            isRoundOver,
          });
      
          callback();
        }
    });
}

const onGetAnswer = ( socket ) =>
{
    socket.on("getAnswer", (data, callback) => 
    {
        const { error, player } = getPlayer(socket.id);
      
        if (error) return callback(error.message);
      
        if (player) {
          const { correctAnswer } = getGameStatus({
            event: "getAnswer",
          });
          io.to(player.room).emit(
            "correctAnswer",
            formatMessage(player.playerName, correctAnswer)
          );
        }
    });
}

/***********************************|
|              SOCKET               |
|__________________________________*/
io.on('connection', ( socket ) => 
{
    console.log('A new player just connected');
    onJoin( socket );
    onDisconnect( socket );
    onSendMessage( socket );
    onGetQuestion( socket );
    onSentAnswer( socket );
    onGetAnswer( socket );
});





/***********************************|
|           SERVER BOOT             |
|__________________________________*/
trivia_server.listen(PORT, () => {
  console.log(`Server is up on port ${ PORT }.`);
});