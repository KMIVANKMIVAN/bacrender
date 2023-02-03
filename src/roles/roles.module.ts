import { Module } from '@nestjs/common';
import { RolService } from './roles.service';
import { RolResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/roles.entity';

@Module({
  providers: [
    RolResolver,
    RolService
  ],
  imports: [
    TypeOrmModule.forFeature([ Rol ])
  ],
  exports: [
    TypeOrmModule,
    RolService
  ]
})
export class RolesModule {}
