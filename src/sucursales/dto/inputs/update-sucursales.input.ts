import { CreateSucursalInput } from './create-sucursales.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateSucursalInput extends PartialType(CreateSucursalInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
