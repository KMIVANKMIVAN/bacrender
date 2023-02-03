import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { EmpresasModule } from '../empresas/empresas.module';
import { RolesModule } from '../roles/roles.module';
import { SucursalesModule } from '../sucursales/sucursales.module';
import { TipoEmpresasModule } from '../tipo-empresas/tipo-empresas.module';

@Module({
  providers: [
    UsuariosResolver,
    UsuariosService
  ],
  imports: [
    TypeOrmModule.forFeature([ Usuario ]),
    EmpresasModule,
    RolesModule,
    SucursalesModule,
    TipoEmpresasModule
  ],
  exports: [
    TypeOrmModule,
    UsuariosService
  ]
})
export class UsuariosModule {}
