import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Severity, Status } from '../entities/incident.entity';

export class UpdateIncidentDto {
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be: open, investigating, resolved' })
  status?: Status;

  @IsOptional()
  @IsEnum(Severity, { message: 'Severity must be: low, medium, high, critical' })
  severity?: Severity;

  @IsOptional()
  @IsString()
  description?: string;
}