import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module'
import { CharacterMoveModule } from './character-move/character-move.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CharacterMoveModule, ChatModule, FallbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
