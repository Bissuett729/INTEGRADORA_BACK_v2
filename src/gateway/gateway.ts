import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(2450, { cors: { origin: '*' } })
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket !! :)');
  }
  handleDisconnect(client: any) {
    throw new Error('Se desconectaron del socket');
  }
  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia');
  }

  @WebSocketServer() server: Server;
}
