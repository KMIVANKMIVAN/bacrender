import { CreateEmpresaInput } from './create-empresas.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateEmpresaInput extends PartialType(CreateEmpresaInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
