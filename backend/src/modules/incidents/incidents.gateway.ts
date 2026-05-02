import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Incident } from './entities/incident.entity';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
})
export class IncidentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(IncidentsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitIncidentCreated(incident: Incident) {
    this.server.emit('incident:created', incident);
  }

  emitIncidentUpdated(incident: Incident) {
    this.server.emit('incident:updated', incident);
  }

  emitIncidentDeleted(id: string) {
    this.server.emit('incident:deleted', { id });
  }
}