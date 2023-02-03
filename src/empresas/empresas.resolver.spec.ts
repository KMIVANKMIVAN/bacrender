import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaResolver } from './empresas.resolver';
import { EmpresaService } from './empresas.service';

describe('EmpresaResolver', () => {
  let resolver: EmpresaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaResolver, EmpresaService],
    }).compile();

    resolver = module.get<EmpresaResolver>(EmpresaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
