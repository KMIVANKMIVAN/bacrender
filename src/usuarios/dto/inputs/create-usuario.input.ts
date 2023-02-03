import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_paterno?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_materno?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_casado?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  numero_carnet: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  extesion: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  celular?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  telefono?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nit_usuario?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  direccion_usuario?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  pagina_web_usuario?: string;

  @Field(() => Int)
  @IsNotEmpty()
  rolId: number;

  @Field(() => Int)
  @IsNotEmpty()
  sucursalId: number;

  @Field(() => Int)
  @IsNotEmpty()
  empresasId: number;
}
