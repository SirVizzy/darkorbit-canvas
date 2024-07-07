const server = new WebSocket("ws://localhost:8080");

server.addEventListener("open", () => {
  console.log("Connected to server");
});

server.addEventListener("message", (event) => {
  console.log("Received message from server", event.data);
});
