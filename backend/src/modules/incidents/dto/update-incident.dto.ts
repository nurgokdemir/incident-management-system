import { IsOptional, MaxLength, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Severity, Status } from '../entities/incident.entity';

export class UpdateIncidentDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  service?: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Status must be: open, investigating, resolved' })
  status?: Status;

  @IsOptional()
  @IsEnum(Severity, { message: 'Severity must be: low, medium, high, critical' })
  severity?: Severity;

  @IsOptional()
  @IsString()
  @MaxLength(250, {
    message: 'Description must be at most 250 characters',
  })
  description?: string;
}