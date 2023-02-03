import { Field, ObjectType } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}
