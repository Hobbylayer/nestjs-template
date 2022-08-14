import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NoSqlService {
  constructor(private readonly configService: ConfigService) {}

  get uri(): string {
    return this.configService.get<string>('mongoDB.uri');
  }
}
