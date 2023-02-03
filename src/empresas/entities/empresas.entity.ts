import { ObjectType, Field, ID } from '@nestjs/graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoEmpresa } from '../../tipo-empresas/entities/tipo-empresas.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'empresas' })
@ObjectType()
export class Empresa {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  razon_social: string;

  @Column({ unique: true })
  @Field(() => String)
  nit_empresa: string;

  @Column()
  @Field(() => String)
  direccion_empresa: string;

  @Column({ nullable: true , unique: true })
  @Field(() => String, { nullable: true })
  pagina_web_empresa: string;

  @Column({ nullable: true , unique: true })
  @Field(() => String, { nullable: true })
  telefono_empresa: string;

  @Column({ nullable: true , unique: true })
  @Field(() => String, { nullable: true })
  linea_gratuita: string;

  @Column({ nullable: true , unique: true })
  @Field(() => String, { nullable: true })
  celular_empresa: string;

  @Column({ nullable: true , unique: true })
  @Field(() => String, { nullable: true })
  correo_empresa: string;

  @ManyToOne(() => TipoEmpresa, (tipo_empresa) => tipo_empresa.empresas, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo_empresa_id' })
  @Field(() => TipoEmpresa)
  tipo_empresa: TipoEmpresa;

  @OneToMany(() => Usuario, (usuario) => usuario.empresa)
  @Field(() => [Usuario], { nullable: false })
  usuarios: Usuario[];
}
