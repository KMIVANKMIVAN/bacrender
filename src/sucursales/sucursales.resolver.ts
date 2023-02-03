import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SucursalService } from './sucursales.service';
import { Sucursal } from './entities/sucursales.entity';
import { CreateSucursalInput, UpdateSucursalInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Sucursal)
@UseGuards(JwtAuthGuard)
export class SucursalResolver {
  constructor(private readonly sucursalService: SucursalService) {}

  // * CREAR SUCURSAL
  @Mutation(() => Sucursal, {
    name: 'CrearSucursal',
    description: 'Ejecuta la creacion de Sucursal',
  })
  async createSucursal(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('createSucursalInput') createSucursalInput: CreateSucursalInput,
  ): Promise<Sucursal> {
    return this.sucursalService.create(createSucursalInput);
  }

  // ? MOSTRAR SUCURSAL
  @Query(() => [Sucursal], {
    name: 'MostrarSucursales',
    description: 'Muestra todas las Sucursales',
  })
  async findAll(
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Sucursal[]> {
    return this.sucursalService.findAll();
  }

  // ? MOSTRAR UNA SUCURSAL
  @Query(() => Sucursal, {
    name: 'BuscarMostrarSucursal',
    description: 'Busca y Muestra una Sucursal',
  })
  findOne(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Sucursal> {
    return this.sucursalService.findOne(id);
  }

  // ! ACTUALIZAR SUCURSAL
  @Mutation(() => Sucursal, {
    name: 'ActualizarSucursal',
    description: 'Actualiza una Sucursal',
  })
  async updateSucursal(
    @CurrentUser('Administrador') usuario: Usuario,
    @Args('updateSucursalInput') updateSucursalInput: UpdateSucursalInput,
  ): Promise<Sucursal> {
    return this.sucursalService.update(
      updateSucursalInput.id,
      updateSucursalInput,
    );
  }

  // ! ELIMINAR SUCURSAL NO IMPLEMENTADO
  /* @Mutation(() => Sucursal)
  removeSucursal(
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ) {
    return this.sucursalService.remove(id);
  } */
}
