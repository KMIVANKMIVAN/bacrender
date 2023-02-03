import { Module } from '@nestjs/common';
import { SucursalService } from './sucursales.service';
import { SucursalResolver } from './sucursales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './entities/sucursales.entity';

@Module({
  providers: [
    SucursalResolver,
    SucursalService
  ],
  imports: [
    TypeOrmModule.forFeature([ Sucursal ])
  ],
  exports: [
    TypeOrmModule,
    SucursalService
  ]
})
export class SucursalesModule {}
