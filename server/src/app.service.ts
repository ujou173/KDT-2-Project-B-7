import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  serveReactApp(): string {
    return (path.join(__dirname, "..", "public", "index.html"))
  }
}
