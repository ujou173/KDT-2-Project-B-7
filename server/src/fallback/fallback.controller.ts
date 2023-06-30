import { Controller, Get, Res } from '@nestjs/common';
import { FallbackService } from './fallback.service';
import { Response } from 'express';

@Controller()
export class FallbackController {
  constructor (private readonly FallbackService: FallbackService) {}
  
  @Get('*')
  serveReact(@Res() res: Response): void {
    res.sendFile(this.FallbackService.serveReact());
  }
}
