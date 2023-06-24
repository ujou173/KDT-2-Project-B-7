import { Module } from '@nestjs/common';
import { FallbackController } from './fallback.controller';
import { FallbackService } from './fallback.service';

@Module({
  imports: [],
  controllers: [FallbackController],
  providers: [FallbackService]
})
export class FallbackModule {}