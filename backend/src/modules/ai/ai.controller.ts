import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { AnalyzeIncidentDto } from './dto/analyze.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze')
  async analyze(@Body() dto: AnalyzeIncidentDto) {
    return this.aiService.analyzeIncident(dto.title, dto.description);
  }
}