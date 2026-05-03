import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzeIncidentDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description!: string;
}