import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    // methods: ['GET', 'POST'],
    credentials: true,
  },
}) // Puedes especificar un puerto, ej.: @WebSocketGateway(8080)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!' + server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(args);
    
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Función para emitir eventos
  emitEvent(eventName: string, data: any): void {
    this.logger.log(eventName);
    this.server.emit(eventName, data);
  }
}
