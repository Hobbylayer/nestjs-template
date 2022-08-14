import { Test, TestingModule } from '@nestjs/testing';
import { NoSqlService } from './no-sql.service';
import { ConfigService } from '@nestjs/config';

const mockDotEnv = () => ({
  get: () => `mongodb+srv://<user>:<pass>@cluster0.frxdl.mongodb.net/db_name`,
});

describe('NoSqlService', () => {
  let service: NoSqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoSqlService,
        { provide: ConfigService, useFactory: mockDotEnv },
      ],
    }).compile();

    service = module.get<NoSqlService>(NoSqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not be null or undefined', () => {
    expect(service.uri).not.toBeNull();
    expect(service.uri).not.toBeUndefined();
  });

  it('should return mongodb connection string', () => {
    expect(service.uri).toBe(
      `mongodb+srv://<user>:<pass>@cluster0.frxdl.mongodb.net/db_name`,
    );
  });
});
