module.exports =  {
	setIo,
	handleConnectedUser,
	handleGameStart,
}

let io;

const rooms = {}
const connectedUsers = {};

function setIo(exportIo)
{
	io = exportIo;

	io.sockets.on('connection', function(socket)
	{
		socket.on('chess_connect', (userSocket) =>
		{
			socket.id = userSocket.id;
			socket.name = userSocket.name;

			const userRoom = Array.from(Object.values(rooms)).filter(room => room.players.includes(socket.name))
			if (userRoom[0]) 
			{
				const roomName = userRoom[0].name;
				socket.join(roomName);
				
				const socketsInRoom = io.sockets.adapter.rooms.get(roomName);


				if (socketsInRoom.size === 2)
				{
					io.sockets.emit('chess_game_started', {players:userRoom[0].players});
				}
			}
		})
	});
}

function handleConnectedUser(socket, action) 
{
	if (action === "add")
	{
		const userId = socket.id
		connectedUsers[userId] = socket;
	} 
	else if (action === "remove")
	{
		for (const [userId, userSocket] of Object.entries(connectedUsers)) {
			if (userSocket === socket) {
			  delete connectedUsers[userId];
			  break;
			}
		}
	}


	io.sockets.emit('active_users', Object.values(connectedUsers).map((data) => 
	{
		return {
			id: data.id,
			name: data.name,
		}
	}).filter(data => data !== undefined));
}

function handleGameStart(currentUser, otherPlayer) 
{
	const roomName = `${currentUser.id}&&${otherPlayer.id}`;
	const targetSocket = connectedUsers[otherPlayer.id];

	currentUser.join(roomName);
	targetSocket.join(roomName);

	const socketsInRoom = io.sockets.adapter.rooms.get(roomName);

	if (socketsInRoom.size === 2) {
		rooms[roomName] = {
			name: roomName,
			players: [currentUser.name, otherPlayer.name]
		}
		
		io.to(roomName).emit('chess_game_prepared', '/chess');
	}
}

