import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(usuarioId: number) {
    return this.jwtService.sign({ id: usuarioId });
  }

  //TODO INICIAR SESION
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { correo, password } = loginInput;

    const usuario = await this.usuariosService.findCorreo(correo);

    if (!bcrypt.compareSync(password, usuario.password)) {
      throw new BadRequestException('Contraseña no es correcta');
    }
    const token = this.getJwtToken(usuario.id);
    return {
      token,
      usuario,
    };
  }

  //TODO VALIDAR USUARIO
  async validateUser(id: number): Promise<Usuario> {
    const usuario = await this.usuariosService.findOneById(id);

    if (!usuario.estado) {
      throw new UnauthorizedException(
        `El Usuario esta inactivo, comunicarse con el administrador`,
      );
    }
    delete usuario.password;

    return usuario;
  }

  //TODO REVALIDAR TOKEN
  revalidateToken(usuario: Usuario): AuthResponse {
    const token = this.getJwtToken(usuario.id);

    return { token, usuario };
  }
}
