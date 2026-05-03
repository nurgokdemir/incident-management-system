import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Severity, Status } from '../entities/incident.entity';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryIncidentDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit?: number = 8;

  @ApiPropertyOptional({ example: 'payment' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ enum: Severity })
  @IsOptional()
  @IsEnum(Severity)
  severity?: Severity;

  @ApiPropertyOptional({ example: 'Payment API' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiPropertyOptional({ example: '2026-05-01T00:00:00.000Z' })
  @IsOptional()
  @IsString()
  createdFrom?: string;

  @ApiPropertyOptional({ example: '2026-05-02T23:59:59.999Z' })
  @IsOptional()
  @IsString()
  createdTo?: string;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}