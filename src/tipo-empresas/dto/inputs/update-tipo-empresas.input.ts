import { CreateTipoEmpresaInput } from './create-tipo-empresas.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateTipoEmpresaInput extends PartialType(
  CreateTipoEmpresaInput,
) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
