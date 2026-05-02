import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { IncidentsGateway } from './incidents.gateway';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { QueryIncidentDto } from './dto/query-incident.dto';
import { IncidentsRepository } from './incidents.repository';

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);

  constructor(
    private readonly incidentsRepository: IncidentsRepository,
    private readonly gateway: IncidentsGateway,
  ) {}

  async create(dto: CreateIncidentDto) {
    const incident = await this.incidentsRepository.create(dto);
    this.logger.log(`Created incident: ${incident.id}`);
    this.gateway.emitIncidentCreated(incident);
    return incident;
  }

  async findAll(query: QueryIncidentDto) {
    return this.incidentsRepository.findAll(query);
  }

  async findOne(id: string) {
    const incident = await this.incidentsRepository.findById(id);
    if (!incident) {
      throw new NotFoundException(`Incident with id "${id}" not found`);
    }
    return incident;
  }

async update(id: string, dto: UpdateIncidentDto) {
  const existingIncident = await this.findOne(id);

  const updated = await this.incidentsRepository.update(existingIncident.id, dto);

  if (!updated) {
    throw new NotFoundException(`Incident with id "${id}" not found`);
  }

  this.logger.log(`Updated incident: ${id}`);
  this.gateway.emitIncidentUpdated(updated);

  return updated;
}
  async remove(id: string) {
    await this.findOne(id);
    await this.incidentsRepository.delete(id);
    this.logger.log(`Deleted incident: ${id}`);
    this.gateway.emitIncidentDeleted(id);
    return { message: 'Incident deleted successfully' };
  }
}