import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSucursalInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  sucursal: string;
}
