import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  testText(): string {
    return "Hello React";
  }
}
