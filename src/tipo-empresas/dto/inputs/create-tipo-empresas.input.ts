import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTipoEmpresaInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  tipo: string;
}
