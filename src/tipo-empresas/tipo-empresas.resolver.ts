import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TipoEmpresaService } from './tipo-empresas.service';
import { TipoEmpresa } from './entities/tipo-empresas.entity';
import { CreateTipoEmpresaInput, UpdateTipoEmpresaInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => TipoEmpresa)
@UseGuards(JwtAuthGuard)
export class TipoEmpresaResolver {
  constructor(private readonly tipoEmpresaService: TipoEmpresaService) {}

  // * CREAR TIPO  EMPRESA
  @Mutation(() => TipoEmpresa, {
    name: 'CrearTipoEmpresa',
    description: 'Ejecuta la creacion de Tipos de Empresas',
  })
  async createTipoEmpresa(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('createTipoEmpresaInput')
    createTipoEmpresaInput: CreateTipoEmpresaInput,
  ): Promise<TipoEmpresa> {
    return this.tipoEmpresaService.create(createTipoEmpresaInput);
  }

  // ? MOSTRAR TIPO  EMPRESAS
  @Query(() => [TipoEmpresa], {
    name: 'MostrarTipoEmpresa',
    description: 'Muestra todas las Tipo Empresas',
  })
  async findAll(
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<TipoEmpresa[]> {
    return this.tipoEmpresaService.findAll();
  }

  // ? BUSCAR UN TIPO  EMPRESA
  @Query(() => TipoEmpresa, {
    name: 'BuscarMostrarTipoEmpresa',
    description: 'Busca y Muestra un Tipo Empresa',
  })
  async findOne(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<TipoEmpresa> {
    return this.tipoEmpresaService.findOne(id);
  }

  // ! ACTUALIZAR TIPO  EMPRESA
  @Mutation(() => TipoEmpresa, {
    name: 'ActualizarTipoEmpresa',
    description: 'Actualiza un Tipo Empresa',
  })
  async updateTipoEmpresa(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('updateTipoEmpresaInput')
    updateTipoEmpresaInput: UpdateTipoEmpresaInput,
  ): Promise<TipoEmpresa> {
    return this.tipoEmpresaService.update(
      updateTipoEmpresaInput.id,
      updateTipoEmpresaInput,
    );
  }

  // ! ELIMINAR TIPO  EMPRESA NO IMPLEMENTADO
  /* @Mutation(() => TipoEmpresa)
  async removeTipoEmpresa(
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario,
    @Args('id', { type: () => ID }) id: number
  ):Promise<TipoEmpresa> {
    return ;
  } */
}
