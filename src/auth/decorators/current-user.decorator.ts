import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export const CurrentUser = createParamDecorator(
  (roles: string = '', context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const usuario: Usuario = ctx.getContext().req.user;

    if (!usuario) {
      throw new InternalServerErrorException(
        `Ningun usuario dentro de la solicitud: asegúrese de que usamos AuthGuard`,
      );
    }

    if (roles.length === 0) return usuario;

    if (roles === usuario.rol.rol) {
      return usuario;
    }

    throw new ForbiddenException(
      `Usuario ${usuario.nombres} con el Rol ${usuario.rol.rol} el rol no es valido. Debe ser de Rol ${roles}`,
    );
  },
);
