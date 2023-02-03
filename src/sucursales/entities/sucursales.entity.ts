import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'sucursales' })
@ObjectType()
export class Sucursal {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  sucursal: string;

  @OneToMany(() => Usuario, (usuario) => usuario.sucursal)
  @Field(() => [Usuario], { nullable: false })
  usuarios: Usuario[];
}
