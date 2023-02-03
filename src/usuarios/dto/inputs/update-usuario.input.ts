import { CreateUsuarioInput } from './create-usuario.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateUsuarioInput extends PartialType(CreateUsuarioInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
