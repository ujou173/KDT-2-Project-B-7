import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module'
import { SocketServerModule } from './socket-server/socket-server.module';

@Module({
  imports: [SocketServerModule, FallbackModule],
  providers: [AppService],
})
export class AppModule {}
