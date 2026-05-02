import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Severity } from '../entities/incident.entity';

export class CreateIncidentDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Service cannot be empty' })
  @IsString()
  service!: string;

  @IsEnum(Severity, { message: 'Severity must be: low, medium, high, critical' })
  severity!: Severity;
}