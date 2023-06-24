import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module'
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, FallbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
