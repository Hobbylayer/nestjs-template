import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { ConfigService } from '@nestjs/config';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string | number) => {
              switch (key) {
                case 'APP_NAME':
                  return 'fakeName';
                case 'PORT':
                  return 9999;
                case 'THROTTLE_TTL':
                  return 60;
                case 'THROTTLE_LIMIT':
                  return 10;
                case 'JWT_ACCESS_TOKEN_SECRET':
                  return 'super-secret-key';
                case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
                  return '1h';
                case 'JWT_REFRESH_TOKEN_SECRET':
                  return 'even-secret-refresh-key';
                case 'JWT_REFRESH_TOKEN_EXPIRATION_TIME':
                  return '1d';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return app name', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce('fakeName');
    expect(service.name).toBe('fakeName');
  });

  it('should return app port', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce(9000);
    expect(service.port).toBe(9000);
  });

  it('should return app throttle time to live', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce(60);
    expect(service.throttleTTL).toBe(60);
  });

  it('should return app throttle limit', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce(10);
    expect(service.throttleLimit).toBe(10);
  });

  it('should return app jwt secret key for access token', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce('super-secret-key');
    expect(service.jwtAccessSecret).toBe('super-secret-key');
  });
  it('should return app jwt expiration time for access token', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce('1h');
    expect(service.jwtAccessExpirationTime).toBe('1h');
  });
  it('should return app jwt secret key for refresh token', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce('even-secret-refresh-key');
    expect(service.jwtRefreshSecret).toBe('even-secret-refresh-key');
  });
  it('should return app jwt expiration time for refresh token', () => {
    jest.spyOn(config, 'get').mockReturnValueOnce('1d');
    expect(service.jwtRefreshExpirationTime).toBe('1d');
  });
});
