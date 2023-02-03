import { UseGuards } from '@nestjs/common';

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

import { LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';
import { CurrentUser } from './decorators/current-user.decorator';

import { Usuario } from '../usuarios/entities/usuario.entity';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //TODO INICIAR SESION
  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Para Iniciar Sesion',
  })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  //TODO REVALIDAR TOKEN
  @Query(() => AuthResponse, {
    name: 'RevalidarToken',
    description: 'Revalidar Token',
  })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser('Administrador') usuario: Usuario,
  ): AuthResponse {
    return this.authService.revalidateToken(usuario);
  }
}
