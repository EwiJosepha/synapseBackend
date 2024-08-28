import { WebSocketGateway, WebSocketServer, SubscribeMessage, WebSocketServerOptions, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageService } from "src/messages/messages.service";
import { MessageDto } from "src/messages/dto-messages/create-message";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3001", // Change to your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})


export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) { }
  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);

  }

  handleDisconnect(client: Socket) {

    console.log(`client disconnected: ${client.id}`);
    console.log("hey");

  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: MessageDto) {
    const message = await this.messageService.createMessage(payload)

    console.log("messaged received", payload);
    this.server.to(payload.receiverId).emit('messageReceived', message)
    this.server.to(payload.senderId).emit('messageSent', message)
  }

}

