import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioInput, UpdateUsuarioInput } from './dto/inputs';
import { Usuario } from './entities/usuario.entity';

import * as bcrypt from 'bcrypt';

import { EmpresaService } from '../empresas/empresas.service';
import { TipoEmpresaService } from '../tipo-empresas/tipo-empresas.service';

import { RolService } from '../roles/roles.service';
import { SucursalService } from '../sucursales/sucursales.service';

@Injectable()
export class UsuariosService {
  private logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly empresaService: EmpresaService,
    private readonly tipoEmpresaService: TipoEmpresaService,
    private readonly rolService: RolService,
    private readonly sucursalService: SucursalService,
  ) {}

  // * CREAR USUARIO
  async create(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    try {
      const empresa = await this.empresaService.findOne(
        createUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(createUsuarioInput.rolId);
      const sucursal = await this.sucursalService.findOne(
        createUsuarioInput.sucursalId,
      );

      const newUsuario = this.usuarioRepository.create({
        ...createUsuarioInput,
        password: bcrypt.hashSync(createUsuarioInput.password, 10),
      });

      newUsuario.empresa = empresa;
      newUsuario.rol = rol;
      newUsuario.sucursal = sucursal;

      return await this.usuarioRepository.save(newUsuario);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ACTUALIZAR USUARIO
  async update(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      if (updateUsuarioInput.sucursalId) {
        if (updateUsuarioInput.password) {
          const sucursal = await this.sucursalService.findOne(
            updateUsuarioInput.sucursalId,
          );
          const usuario = await this.usuarioRepository.preload({
            ...updateUsuarioInput,
            password: bcrypt.hashSync(updateUsuarioInput.password, 10),
          });
          usuario.sucursal = sucursal;

          if (!usuario)
            throw new NotFoundException(
              `Usuario con el id: ${id} no se encuentra`,
            );

          return this.usuarioRepository.save(usuario);
        } else {
          const sucursal = await this.sucursalService.findOne(
            updateUsuarioInput.sucursalId,
          );
          const usuario = await this.usuarioRepository.preload(
            updateUsuarioInput,
          );
          usuario.sucursal = sucursal;

          if (!usuario)
            throw new NotFoundException(
              `Usuario con el id: ${id} no se encuentra`,
            );

          return this.usuarioRepository.save(usuario);
        }
      } else {
        if (updateUsuarioInput.password) {
          const usuario = await this.usuarioRepository.preload({
            ...updateUsuarioInput,
            password: bcrypt.hashSync(updateUsuarioInput.password, 10),
          });

          if (!usuario)
            throw new NotFoundException(
              `Usuario con el id: ${id} no se encuentra`,
            );

          return this.usuarioRepository.save(usuario);
        } else {
          const usuario = await this.usuarioRepository.preload(
            updateUsuarioInput,
          );

          if (!usuario)
            throw new NotFoundException(
              `Usuario con el id: ${id} no se encuentra`,
            );

          return this.usuarioRepository.save(usuario);
        }
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR USUARIOS
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['empresa', 'rol', 'sucursal'],
    });
  }

  // ? BUSCAR POR EL CORREO
  async findCorreo(correo: string): Promise<Usuario> {
    try {
      // return await this.usuarioRepository.findOneByOrFail({ id })
      const usuario = await this.usuarioRepository.findOne({
        where: { correo },
        relations: ['empresa', 'rol', 'sucursal'],
      });

      if (!usuario)
        throw new NotImplementedException(

          `Usuario con Correo: ${correo} no encontrado`
        );

      return usuario;
    } catch (error) {
      throw new NotFoundException(`Usuario con el Correo: ${correo} no Existe`);
    }
  }
  // ? BUSCAR POR EL CORREO
  async findOneByEmail(correo: string): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneByOrFail({ correo });
    } catch (error) {
      throw new NotFoundException(
        `El correo: ${correo} no se encontro o no existe`,
      );
    }
  }

  // * BUSCAR POR EL ID
  async findOneById(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['empresa', 'rol', 'sucursal'],
      });

      if (!usuario)
        throw new NotImplementedException(
          `Usuario con el id: ${id} no se encuentra`,
        );

      return usuario;
    } catch (error) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
  }

  // ! ELIMINAR USUARIO NO IMPLEMENTADO
  /* async remove(id: number): Promise<Usuario> {
    return ;
  } */

  // ! MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Porfavor revise en el server logs');
  }
}
