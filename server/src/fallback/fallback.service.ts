import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class FallbackService {
  serveReact(): string {
    return path.join(__dirname, "..", "..", "public", "index.html");
  }
}
