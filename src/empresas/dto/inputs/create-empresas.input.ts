import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEmpresaInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  razon_social: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  nit_empresa: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  direccion_empresa: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  pagina_web_empresa: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  telefono_empresa: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  linea_gratuita: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  celular_empresa: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  correo_empresa: string;

  @Field(() => Int)
  @IsNotEmpty()
  tipo_empresas_id: number;
}
