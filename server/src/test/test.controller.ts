import { Controller, Get, Res } from '@nestjs/common';
import { TestService } from './test.service';
import { Response } from 'express';

@Controller('test')
export class TestController {
  constructor (private readonly TestService: TestService) {}

  @Get()
  testText(@Res() res: Response) {
    res.send(this.TestService.testText());
  }
}
