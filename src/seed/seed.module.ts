import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { EmpresasModule } from '../empresas/empresas.module';
import { TipoEmpresasModule } from '../tipo-empresas/tipo-empresas.module';
import { RolesModule } from '../roles/roles.module';
import { SucursalesModule } from '../sucursales/sucursales.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    UsuariosModule,
    EmpresasModule,
    TipoEmpresasModule,
    RolesModule,
    SucursalesModule
  ]
})
export class SeedModule {}
