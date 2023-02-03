import { ObjectType, Field, ID } from '@nestjs/graphql';

import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from '../../empresas/entities/empresas.entity';

@Entity({ name: 'tipo_empresas' })
@ObjectType()
export class TipoEmpresa {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  tipo: string;

  @OneToMany(() => Empresa, (empresa) => empresa.tipo_empresa)
  @Field(() => [Empresa], { nullable: false })
  empresas: Empresa[];
}
