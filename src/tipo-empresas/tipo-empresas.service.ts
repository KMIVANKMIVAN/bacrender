import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoEmpresaInput, UpdateTipoEmpresaInput } from './dto/inputs';
import { TipoEmpresa } from './entities/tipo-empresas.entity';

import { Empresa } from '../empresas/entities/empresas.entity';

@Injectable()
export class TipoEmpresaService {
  constructor(
    @InjectRepository(TipoEmpresa)
    private readonly tipoEmpresaRepository: Repository<TipoEmpresa>,
  ) {}

  // * CREAR TIPO  EMPRESA
  async create(
    createTipoEmpresaInput: CreateTipoEmpresaInput,
  ): Promise<TipoEmpresa> {
    const newTipoEmpresa = this.tipoEmpresaRepository.create(
      createTipoEmpresaInput,
    );
    return await this.tipoEmpresaRepository.save(newTipoEmpresa);
  }

  // ? BUSCAR TIPO  EMPRESAS
  async findAll(): Promise<TipoEmpresa[]> {
    return this.tipoEmpresaRepository.find({
      relations: ['empresas'],
    });
  }

  // ? BUSCAR UN TIPO  EMPRESA
  async findOne(id: number): Promise<TipoEmpresa> {
    const tipoEmpresa = await this.tipoEmpresaRepository.findOne({
      where: { id },
      relations: ['empresas'],
    });

    if (!tipoEmpresa)
      throw new NotImplementedException(
        `Tipo Empresa con el id: ${id} no se encuentra`,
      );

    return tipoEmpresa;
  }

  // ! ACTUALIZAR TIPO  EMPRESA
  async update(
    id: number,
    updateTipoEmpresaInput: UpdateTipoEmpresaInput,
  ): Promise<TipoEmpresa> {
    const tipoEmpresa = await this.tipoEmpresaRepository.preload(
      updateTipoEmpresaInput,
    );

    if (!tipoEmpresa)
      throw new NotFoundException(
        `Tipo Empresa con el id: ${id} no se encuentra`,
      );

    return this.tipoEmpresaRepository.save(tipoEmpresa);
  }

  // ! ELIMINAR TIPO  EMPRESA NO IMPLEMENTADO
  /* async remove(id: number) {
    return `This action removes a #${id} tipoEmpresa`;
  } */
}
