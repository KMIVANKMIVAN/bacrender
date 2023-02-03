import { CreateRolInput } from './create-roles.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateRolInput extends PartialType(CreateRolInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
