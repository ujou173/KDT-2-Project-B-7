import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module';
import { SocketModule } from './socket/Socket.module';

@Module({
  imports: [SocketModule, FallbackModule],
  providers: [AppService],
})
export class AppModule {}
