import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async analyzeIncident(title: string, description: string) {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'Return only JSON.',
          },
          {
            role: 'user',
            content: `
Analyze incident:

Title: ${title}
Description: ${description}

Return:
{
 "severity": "low | medium | high | critical",
 "service": "Payment API | Auth Service | Notification Worker | Other"
}
`,
          },
        ],
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      this.logger.warn('OpenAI failed → fallback AI used');

      return this.fallbackAI(title, description);
    }
  }

  private fallbackAI(title: string, description: string) {
    const text = `${title} ${description}`.toLowerCase();

    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let service = 'Other';

    // 🔥 severity rules
    if (text.includes('timeout') || text.includes('not responding')) {
      severity = 'critical';
    } else if (text.includes('slow') || text.includes('latency')) {
      severity = 'high';
    } else if (text.includes('delay')) {
      severity = 'medium';
    } else {
      severity = 'low';
    }

    // 🔥 service rules
    if (text.includes('payment')) {
      service = 'Payment API';
    } else if (text.includes('auth') || text.includes('login')) {
      service = 'Auth Service';
    } else if (text.includes('email') || text.includes('notification')) {
      service = 'Notification Worker';
    }

    return { severity, service };
  }
}