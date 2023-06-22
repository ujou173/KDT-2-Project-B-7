import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { FallbackController } from './fallback/fallback.controller';
import { FallbackService } from './fallback/fallback.service';

@Module({
  imports: [],
  controllers: [AppController, TestController, FallbackController],
  providers: [AppService, TestService, FallbackService],
})
export class AppModule {}
