import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { QueryIncidentDto } from './dto/query-incident.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Injectable()
export class IncidentsRepository {
  constructor(
    @InjectRepository(Incident)
    private readonly repo: Repository<Incident>,
  ) {}

  async create(dto: CreateIncidentDto): Promise<Incident> {
    const incident = this.repo.create(dto);
    return this.repo.save(incident);
  }

async findAll(query: QueryIncidentDto) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  const skip = (page - 1) * limit;

  const qb = this.repo.createQueryBuilder('incident');

  qb.where('incident.deletedAt IS NULL');

  if (query.status) {
    qb.andWhere('incident.status = :status', { status: query.status });
  }

  if (query.severity) {
    qb.andWhere('incident.severity = :severity', { severity: query.severity });
  }

  if (query.service) {
    qb.andWhere('LOWER(incident.service) LIKE LOWER(:service)', {
      service: `%${query.service}%`,
    });
  }

  if (query.createdFrom) {
    qb.andWhere('incident.createdAt >= :createdFrom', {
      createdFrom: query.createdFrom,
    });
  }

  if (query.createdTo) {
    qb.andWhere('incident.createdAt <= :createdTo', {
      createdTo: query.createdTo,
    });
  }

  qb.orderBy('incident.createdAt', query.sortOrder ?? 'DESC')
    .skip(skip)
    .take(limit);

  const [data, total] = await qb.getManyAndCount();

return {
  data,
  meta: { 
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPreviousPage: page > 1,
    sortBy: 'createdAt',
    sortOrder: query.sortOrder ?? 'DESC',
  },
};
}

  async findById(id: string): Promise<Incident | null> {
    return this.repo.findOne({ where: { id } });
  }

async update(id: string, dto: UpdateIncidentDto) {
  await this.repo.update(id, dto);

  const updatedIncident = await this.findById(id);

  if (!updatedIncident) {
    return null;
  }

  return updatedIncident;
}

async delete(id: string): Promise<void> {
  await this.repo.softDelete(id);
}
}