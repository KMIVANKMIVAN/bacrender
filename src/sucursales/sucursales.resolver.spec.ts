import { Test, TestingModule } from '@nestjs/testing';
import { SucursalResolver } from './sucursales.resolver';
import { SucursalService } from './sucursales.service';

describe('SucursalResolver', () => {
  let resolver: SucursalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SucursalResolver, SucursalService],
    }).compile();

    resolver = module.get<SucursalResolver>(SucursalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
