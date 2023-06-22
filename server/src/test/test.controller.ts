import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor (private TestService: TestService) {}

  @Get()
  testText(): string {
    return this.TestService.testText();
  }
}
