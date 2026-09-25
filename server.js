const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (message) => {
    console.log("received:", message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.send("server connected");
});

console.log(`WebSocket server running on port ${PORT}`);
