import { Module } from '@nestjs/common';
import { EmpresaService } from './empresas.service';
import { EmpresaResolver } from './empresas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresas.entity';
import { TipoEmpresasModule } from '../tipo-empresas/tipo-empresas.module';

@Module({
  providers: [
    EmpresaResolver,
    EmpresaService
  ],
  imports: [
    TypeOrmModule.forFeature([ Empresa ]),
    TipoEmpresasModule
  ],
  exports: [
    TypeOrmModule,
    EmpresaService
  ]

})
export class EmpresasModule {}
