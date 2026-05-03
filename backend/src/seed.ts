import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Incident, Severity, Status } from './modules/incidents/entities/incident.entity';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'incident_db',
  entities: [Incident],
  synchronize: true,
});

const seeds = [
  {
    title: 'Database timeout on payment service',
    description: 'Users are receiving timeout errors during checkout. Affecting 30% of transactions.',
    service: 'Payment API',
    severity: Severity.CRITICAL,
    status: Status.OPEN,
  },
  {
    title: 'Auth token expiry too aggressive',
    description: 'JWT tokens expiring after 5 minutes instead of configured 1 hour.',
    service: 'Auth Service',
    severity: Severity.HIGH,
    status: Status.INVESTIGATING,
  },
  {
    title: 'Notification emails delayed',
    description: 'Email notifications taking 20+ minutes to deliver. Queue backlog detected.',
    service: 'Notification Worker',
    severity: Severity.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: 'Slow API response on /products endpoint',
    description: 'P95 latency increased from 200ms to 2s after last deploy.',
    service: 'Payment API',
    severity: Severity.LOW,
    status: Status.RESOLVED,
  },
  {
    title: 'Memory leak in worker process',
    description: 'Notification worker memory grows unbounded, crashes every 6 hours.',
    service: 'Notification Worker',
    severity: Severity.HIGH,
    status: Status.INVESTIGATING,
  },
];

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Incident);
  const incidents = repo.create(seeds);
  await repo.save(incidents);
  console.log(`✅ Seeded ${incidents.length} incidents`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});