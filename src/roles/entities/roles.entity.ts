import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'roles' })
@ObjectType()
export class Rol {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  rol: string;

  @Column()
  @Field(() => String)
  tiporol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  @Field(() => [Usuario], { nullable: false })
  usuarios: Usuario[];
}
