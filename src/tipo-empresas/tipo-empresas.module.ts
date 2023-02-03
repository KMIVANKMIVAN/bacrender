import { Module } from '@nestjs/common';
import { TipoEmpresaService } from './tipo-empresas.service';
import { TipoEmpresaResolver } from './tipo-empresas.resolver';
import { TipoEmpresa } from './entities/tipo-empresas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [
    TipoEmpresaResolver,
    TipoEmpresaService
  ],
  imports: [
    TypeOrmModule.forFeature([ TipoEmpresa ])
  ],
  exports: [
    TypeOrmModule,
    TipoEmpresaService
  ]
})
export class TipoEmpresasModule {}
