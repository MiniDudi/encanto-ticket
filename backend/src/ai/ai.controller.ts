import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {

    constructor(
        private readonly aiService: AiService
    ) {}

    @Post('suggest-response')
    async suggest(
        @Body() body: { description: string }
    ) {

        return this.aiService.generateResponse(
            body.description
        );
    }
}