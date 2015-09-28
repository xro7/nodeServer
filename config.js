var io;
var gameSocket;
var availableGames = [];
var connectedusers = 0;

exports.initgame = function(sio,socket){
    io = sio;
    gameSocket = socket;
    connectedusers++;
    io.emit('update users', { users: connectedusers });
    console.log('user connected %d',connectedusers);
    //gameSocket.emit('connected', {users: connectedusers});

    gameSocket.on('disconnect',disconnect);
    gameSocket.on('new game',createGame);
    gameSocket.on('join game',joinGame);

}
    // Host Events


function disconnect(){
	connectedusers--;
	console.log('user connected %d',connectedusers)
	io.emit('update users', { users: connectedusers });
}

function createGame(data) {
    console.log("%s has requested a new game",data);
    // Create a unique Socket.IO Room
    var thisGameId =( Math.random() * 100000 ) | 0;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('game created', {gameId: thisGameId, mySocketId: this.id});
    availableGames.push( {gameId: thisGameId, mySocketId: this.id});
    // Join the Room and wait for the players
    this.join(thisGameId.toString());
    
}

function joinGame () {
    console.log(JSON.stringify(availableGames));
    this.emit('available games', JSON.parse(JSON.stringify(availableGames)));
}