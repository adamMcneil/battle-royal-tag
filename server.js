const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Game = require('./types/Game.js')
const Player = require('./types/Player.js')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();
const game = new Game();

wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

app.use(express.json());

app.post("/broadcast", (req, res) => {
  const { message } = req.body;

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  res.status(200).send("Message broadcasted to all clients");
});

app.post("/join", (req, res) => {
  console.log(req.body.player);
  game.addPlayer(new Player(req.body));
  console.log(JSON.stringify(game))
  console.log(clients)
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });

  res.status(200).send("joined game");
});

app.post("/kill", (req, res) => {
  console.log(req.body);
  game.player_list.kill(req.body);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });

  res.status(200).send("Message broadcasted to all clients");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
