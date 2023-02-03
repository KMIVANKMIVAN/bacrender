import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  correo: string;

  @Field(() => String)
  @MinLength(8)
  password: string;
}
// ! Borrar ya que es para crear cuentas de usuarios
