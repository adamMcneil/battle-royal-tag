const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();
// const game = new Game();

// WebSocket connection handling
wss.on('connection', (ws) => {
  clients.add(ws);

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
  });
});

// Express middleware to handle POST requests
app.use(express.json());

app.post('/broadcast', (req, res) => {
  const { message } = req.body;

  // Broadcast the message to all connected clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  res.status(200).send('Message broadcasted to all clients');
});

app.post('/join', (req, res) => {
    console.log(req.body)
    game.addPlayer(new Player(req.body));

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(game));
        }
    });

    res.status(200).send('joined game');
})

app.post('/kill', (req, res) => {
    console.log(req.body)
    game.player_list.kill(req.body);

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(game));
        }
    });

    res.status(200).send('Message broadcasted to all clients');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
