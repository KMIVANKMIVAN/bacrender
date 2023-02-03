import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import { Empresa } from '../../empresas/entities/empresas.entity';
import { Rol } from '../../roles/entities/roles.entity';
import { Sucursal } from '../../sucursales/entities/sucursales.entity';

@Entity({ name: 'usuarios' })
@ObjectType()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_paterno: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_materno: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_casado: string;

  @Column()
  @Field(() => String, { nullable: false })
  nombres: string;

  @Column({ unique: true })
  @Field(() => String, { nullable: false })
  numero_carnet: string;

  @Column()
  @Field(() => String, { nullable: false })
  extesion: string;

  @Column({ unique: true })
  @Field(() => String, { nullable: false })
  correo: string;

  @Column()
  @Field( () => String, { nullable: false })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean, { nullable: false })
  estado: boolean;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  celular: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  telefono: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  nit_usuario: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  direccion_usuario: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  pagina_web_usuario: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
  @JoinColumn({ name: 'rol_id' })
  @Field(() => Rol)
  rol: Rol;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.usuarios, {
    nullable: false,
  })
  @JoinColumn({ name: 'sucursal_id' })
  @Field(() => Sucursal)
  sucursal: Sucursal;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuarios, { nullable: false })
  @JoinColumn({ name: 'empresa_id' })
  @Field(() => Empresa)
  empresa: Empresa;
}
