import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpresaInput, UpdateEmpresaInput } from './dto/inputs';
import { Empresa } from './entities/empresas.entity';
import { TipoEmpresaService } from '../tipo-empresas/tipo-empresas.service';

@Injectable()
export class EmpresaService {
  private logger = new Logger('EmpresasService');

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    private readonly tipoEmpresaService: TipoEmpresaService,
  ) {}

  // * CREAR EMPRESA
  async create(createEmpresaInput: CreateEmpresaInput): Promise<Empresa> {
    try {
      const tipoEmpresa = await this.tipoEmpresaService.findOne(
        createEmpresaInput.tipo_empresas_id,
      );
      const newEmpresa = this.empresaRepository.create(createEmpresaInput);

      newEmpresa.tipo_empresa = tipoEmpresa;

      return await this.empresaRepository.save(newEmpresa);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ACTUALIZAR EMPRESA
  async update(
    id: number,
    updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    try {
      const empresa = await this.empresaRepository.preload(updateEmpresaInput);

      if (!empresa)
        throw new NotFoundException(`Empresa con el id: ${id} no se encuentra`);

      return this.empresaRepository.save(empresa);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR EMPRESA
  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find({
      relations: ['tipo_empresa', 'usuarios'],
    });
  }

  // ? MOSTRAR UNA EMPRESA
  async findOne(id: number): Promise<Empresa> {
    try {
      const empresa = await this.empresaRepository.findOne({
        where: { id },
        relations: ['tipo_empresa', 'usuarios'],
      });

      if (!empresa)
        throw new NotImplementedException(
          `Empresa con el id: ${id} no se encuentra`,
        );

      return empresa;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ELIMINAR EMPRESA NO IMPLEMENTADO
  /* async remove(id: number) {
    return `This action removes a #${id} empresa`;
  } */

  // ! MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('El Valor del Campo', ''));
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Porfavor revise en el server logs');
  }
}
