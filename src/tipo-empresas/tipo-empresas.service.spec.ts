import { Test, TestingModule } from '@nestjs/testing';
import { TipoEmpresaService } from './tipo-empresas.service';

describe('TipoEmpresaService', () => {
  let service: TipoEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoEmpresaService],
    }).compile();

    service = module.get<TipoEmpresaService>(TipoEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
