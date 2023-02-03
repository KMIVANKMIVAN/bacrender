import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput, UpdateUsuarioInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Usuario)
@UseGuards(JwtAuthGuard)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  // * CREAR USUARIO
  @Mutation(() => Usuario, {
    name: 'CrearUsuario',
    description: 'Ejecuta la creacion de Usuario',
  })
  async createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioInput);
  }

  // ? MOSTRAR USUARIOS
  @Query(() => [Usuario], {
    name: 'MostrarUsuario',
    description: 'Muestra todos los Usuarios',
  })
  async findAll(
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  // ? MOSTRAR UN USUARIO
  @Query(() => Usuario, {
    name: 'BuscarMostrarUsuario',
    description: 'Busca y Muestra un Usuario',
  })
  async findOne(
    @Args('id', { type: () => ID }) id: number,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.findOneById(id);
  }

  // ! ACTUALIZAR USUARIO
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuario',
    description: 'Actualiza un Usuario',
  })
  async updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.update(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }

  // * MOSTRAR UN USUARIO POR CORREO
  @Query(() => Usuario, {
    name: 'MostrarUsuarioPorCorreo',
    description: 'Busca y Muestra un Usuario por su Correo',
  })
  async findCorreo(
    @Args('correo', { type: () => String }) correo: string,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.findCorreo(correo);
  }

  // ! ELIMINAR USUARIO NO IMPLEMENTADO
  /* @Mutation(() => Usuario)
  async removeUsuario(
    @Args('id', { type: () => ID }) id: number,
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario
  ):Promise<Usuario> {
    return this.usuariosService.remove(id);
  } */
}
