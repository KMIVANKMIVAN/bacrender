import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { Empresa } from '../empresas/entities/empresas.entity';

import { TipoEmpresa } from '../tipo-empresas/entities/tipo-empresas.entity';
import { Rol } from '../roles/entities/roles.entity';
import { Sucursal } from '../sucursales/entities/sucursales.entity';
import {
  SEED_TIPO_EMPRESAS,
  SEED_ROLES,
  SEED_SUCURSALES,
  SEED_EMPRESAS,
} from './data/seed-data';

import { TipoEmpresaService } from '../tipo-empresas/tipo-empresas.service';
import { RolService } from '../roles/roles.service';
import { SucursalService } from '../sucursales/sucursales.service';
import { EmpresaService } from '../empresas/empresas.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { SEED_USUARIOS } from './data/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(TipoEmpresa)
    private readonly tipoEmpresaRepository: Repository<TipoEmpresa>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,

    private readonly tipoEmpresaService: TipoEmpresaService,
    private readonly rolService: RolService,
    private readonly sucursalService: SucursalService,
    private readonly empresaService: EmpresaService,
    private readonly usuarioService: UsuariosService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException(
        'Nosotros no podemos ejecutar SEED en Prod',
      );
    }

    // Limpiar la base de datos BORRAR TODO

    await this.deleteDatabase();

    // Crear tipoEmpresa rol sucursal
    const tipoEmpresa = await this.loadTipoEmpresa();
    const rol = await this.loadRol();
    const sucursal = await this.loadSucursal();

    // Crear empresa y usuario
    const empresa = await this.loadEmpresa(tipoEmpresa);

    await this.loadUsuario(empresa, rol, sucursal );

    return true;
  }

  async deleteDatabase() {
    // borrar usuarios
    await this.usuarioRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar empresas
    await this.empresaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar tipo empresas
    await this.tipoEmpresaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar rol
    await this.rolRepository.createQueryBuilder().delete().where({}).execute();

    // borrar sucursal
    await this.sucursalRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadTipoEmpresa(): Promise<TipoEmpresa> {
    const tipoEmpresas = [];

    for (const tipoEmpresa of SEED_TIPO_EMPRESAS) {
      tipoEmpresas.push(await this.tipoEmpresaService.create(tipoEmpresa));
    }

    return tipoEmpresas[0];
  }

  async loadRol(): Promise<Rol> {
    const roles = [];

    for (const rol of SEED_ROLES) {
      roles.push(await this.rolService.create(rol));
    }

    return roles[0];
  }

  async loadSucursal(): Promise<Sucursal> {
    const sucursales = [];

    for (const sucursal of SEED_SUCURSALES) {
      sucursales.push(await this.sucursalService.create(sucursal));
    }

    return sucursales[0];
  }

  async loadEmpresa(tipoEmpresa: TipoEmpresa): Promise<Empresa> {
    const empresas = [];

    for(let first of SEED_EMPRESAS) {
      first.tipo_empresas_id = tipoEmpresa.id
    }

    for (const empresa of SEED_EMPRESAS) {
      empresas.push(await this.empresaService.create(empresa));
    }

    return empresas[0];
  }

  async loadUsuario( empresa: Empresa, rol: Rol, sucursal: Sucursal): Promise<Usuario> {
    const usuarios = [];

    for(let first of SEED_USUARIOS) {
      first.rolId = rol.id
    }
    for(let first of SEED_USUARIOS) {
      first.sucursalId = sucursal.id
    }
    for(let first of SEED_USUARIOS) {
      first.empresasId = empresa.id
    }

    for (const ususario of SEED_USUARIOS) {
      usuarios.push(await this.usuarioService.create(ususario));
    }

    return usuarios[0];
  }

}
