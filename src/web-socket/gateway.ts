import { WebSocketGateway, WebSocketServer, SubscribeMessage, WebSocketServerOptions, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3001", // Change to your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);

  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: {
    userId: string; message: string
  }) {

    console.log("messaged received", payload);
    this.server.emit("receivedMessage", payload)
  }


}