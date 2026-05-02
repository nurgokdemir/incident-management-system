import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { QueryIncidentDto, SortOrder } from './dto/query-incident.dto';
import { Severity, Status } from './entities/incident.entity';

@ApiTags('incidents')
@Controller('incidents')
export class IncidentsController {
  private readonly logger = new Logger(IncidentsController.name);

  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new incident' })
  @ApiResponse({ status: 201, description: 'Incident created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateIncidentDto) {
    this.logger.log(`POST /incidents`);
    return this.incidentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all incidents' })
  @ApiResponse({ status: 200, description: 'Paginated incident list' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: Status })
  @ApiQuery({ name: 'severity', required: false, enum: Severity })
  @ApiQuery({ name: 'service', required: false, example: 'Payment API' })
  @ApiQuery({ name: 'createdFrom', required: false, example: '2026-05-01T00:00:00.000Z' })
  @ApiQuery({ name: 'createdTo', required: false, example: '2026-05-02T23:59:59.999Z' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  findAll(@Query() query: QueryIncidentDto) {
    this.logger.log(`GET /incidents`);
    return this.incidentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get incident by ID' })
  @ApiResponse({ status: 200, description: 'Incident details' })
  @ApiResponse({ status: 404, description: 'Incident not found' })
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /incidents/${id}`);
    return this.incidentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an incident' })
  @ApiResponse({ status: 200, description: 'Incident updated' })
  @ApiResponse({ status: 404, description: 'Incident not found' })
  update(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    this.logger.log(`PATCH /incidents/${id}`);
    return this.incidentsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an incident' })
  @ApiResponse({ status: 200, description: 'Incident deleted' })
  @ApiResponse({ status: 404, description: 'Incident not found' })
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /incidents/${id}`);
    return this.incidentsService.remove(id);
  }
}