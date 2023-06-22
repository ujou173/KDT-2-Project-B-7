import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackController } from './fallback/fallback.controller';
import { FallbackService } from './fallback/fallback.service';

@Module({
  imports: [],
  controllers: [AppController, FallbackController],
  providers: [AppService, FallbackService],
})
export class AppModule {}
