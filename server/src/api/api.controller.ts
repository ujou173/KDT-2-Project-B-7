import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor (private readonly ApiService: ApiService) {}
  @Get()
  testTest(@Res() res: Response): void {
    res.send(this.ApiService.testText());
  }
}
