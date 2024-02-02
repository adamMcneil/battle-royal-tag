const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const Game = require("../types/Game.js");
const Player = require("../types/Player.js");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();
let game = new Game();

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
app.use(cors());

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
  game.addPlayer(new Player(req.body.player));
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });

  res.status(200).send("joined game");
});

app.get("/game", (req, res) => {
  res.status(200).send(JSON.stringify(game));
});

app.get("/shuffle", (req, res) => {
  game.shuffle();
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });
  res.status(200).send("Shuffled");
});

app.get("/reset", (req, res) => {
  game = new Game();
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });
  res.status(200).send("reset");
});

app.post("/kill", (req, res) => {
  game.kill(req.body);

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
