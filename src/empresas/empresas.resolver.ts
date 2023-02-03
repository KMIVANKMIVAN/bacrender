import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { EmpresaService } from './empresas.service';
import { Empresa } from './entities/empresas.entity';
import { CreateEmpresaInput, UpdateEmpresaInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Resolver(() => Empresa)
@UseGuards(JwtAuthGuard)
export class EmpresaResolver {
  constructor(private readonly empresaService: EmpresaService) {}

  // * CREAR EMPRESA
  @Mutation(() => Empresa, {
    name: 'CrearEmpresa',
    description: 'Ejecuta la creacion de Empresa',
  })
  async createEmpresa(
    @Args('createEmpresaInput') createEmpresaInput: CreateEmpresaInput,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Empresa> {
    return this.empresaService.create(createEmpresaInput);
  }

  // ? MOSTRAR EMPRESA
  @Query(() => [Empresa], {
    name: 'MostrarEmpresas',
    description: 'Muestra todas las Empresas',
  })
  async findAll(
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  // ? MOSTRAR UNA EMPRESA
  @Query(() => Empresa, {
    name: 'BuscarMostrarEmpresa',
    description: 'Busca y Muestra una Empresa',
  })
  async findOne(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Empresa> {
    return this.empresaService.findOne(id);
  }

  // ! ACTUALIZAR EMPRESA
  @Mutation(() => Empresa, {
    name: 'ActualizarEmpresa',
    description: 'Actualiza una Empresa',
  })
  async updateEmpresa(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('updateEmpresaInput') updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    return this.empresaService.update(
      updateEmpresaInput.id,
      updateEmpresaInput,
    );
  }

  // ! ELIMINAR SUCURSAL NO IMPLEMENTADO
  /* @Mutation(() => Empresa)
  removeEmpresa(
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario,
    @Args('id', { type: () => ID }) id: number) {
    return this.empresaService.remove(id);
  } */
}
