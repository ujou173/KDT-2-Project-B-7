import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackController } from './fallback/fallback.controller';
import { FallbackService } from './fallback/fallback.service';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController, FallbackController],
  providers: [AppService, ApiService, FallbackService],
})
export class AppModule {}
