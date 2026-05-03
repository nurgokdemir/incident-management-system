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
  const limit = query.limit ?? 8;
  const skip = (page - 1) * limit;

  const baseQb = this.repo.createQueryBuilder('incident');

  baseQb.where('incident.deletedAt IS NULL');

  if (query.search) {
  baseQb.andWhere(
    `(
      LOWER(incident.title) LIKE LOWER(:search)
      OR LOWER(incident.description) LIKE LOWER(:search)
      OR LOWER(incident.service) LIKE LOWER(:search)
      OR CAST(incident.id AS TEXT) LIKE :search
    )`,
    { search: `%${query.search}%` },
  );
}

  if (query.status) {
    baseQb.andWhere('incident.status = :status', { status: query.status });
  }

  if (query.severity) {
    baseQb.andWhere('incident.severity = :severity', {
      severity: query.severity,
    });
  }

  if (query.service) {
    baseQb.andWhere('LOWER(incident.service) LIKE LOWER(:service)', {
      service: `%${query.service}%`,
    });
  }

  if (query.createdFrom) {
    baseQb.andWhere('incident.createdAt >= :createdFrom', {
      createdFrom: query.createdFrom,
    });
  }

  if (query.createdTo) {
    baseQb.andWhere('incident.createdAt <= :createdTo', {
      createdTo: query.createdTo,
    });
  }

  const total = await baseQb.clone().getCount();

  const severityRaw = await baseQb
  .clone()
  .select('incident.severity', 'severity')
  .addSelect('COUNT(incident.id)', 'count')
  .groupBy('incident.severity')
  .getRawMany();

const severityStats = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
};

severityRaw.forEach((item) => {
  severityStats[item.severity as 'critical' | 'high' | 'medium' | 'low'] =
    Number(item.count);
});

  const statsRaw = await baseQb
    .clone()
    .select('incident.status', 'status')
    .addSelect('COUNT(incident.id)', 'count')
    .groupBy('incident.status')
    .getRawMany();

  const stats = {
    total,
    open: 0,
    investigating: 0,
    resolved: 0,
  };

  statsRaw.forEach((item) => {
    stats[item.status as 'open' | 'investigating' | 'resolved'] = Number(
      item.count,
    );
  });

  const data = await baseQb
    .clone()
    .orderBy('incident.createdAt', query.sortOrder ?? 'DESC')
    .skip(skip)
    .take(limit)
    .getMany();

  const totalPages = Math.ceil(total / limit);

return {
  data,
  meta: {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    sortBy: 'createdAt',
    sortOrder: query.sortOrder ?? 'DESC',
  },
  stats,
  severityStats,
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