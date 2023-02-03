import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRolInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  rol: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  tiporol: string;
}
