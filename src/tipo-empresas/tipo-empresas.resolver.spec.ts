import { Test, TestingModule } from '@nestjs/testing';
import { TipoEmpresaResolver } from './tipo-empresas.resolver';
import { TipoEmpresaService } from './tipo-empresas.service';

describe('TipoEmpresaResolver', () => {
  let resolver: TipoEmpresaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoEmpresaResolver, TipoEmpresaService],
    }).compile();

    resolver = module.get<TipoEmpresaResolver>(TipoEmpresaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
