import { setupCanvas } from "../../client/src/canvas";
import WebSocket from "ws";

setupCanvas();

const TICK_RATE = 60;
const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    console.log("Received:", message);
  });
});

// Create a game loop that sends a message to all connected clients every tick, only for relevant clients.
setInterval(() => {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("tick");
    }
  });
}, 1000 / TICK_RATE);
