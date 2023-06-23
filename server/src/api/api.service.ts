import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  testText(): string {
    return 'Hello React~'
  }
}
