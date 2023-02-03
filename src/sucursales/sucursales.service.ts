import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSucursalInput, UpdateSucursalInput } from './dto/inputs';
import { Sucursal } from './entities/sucursales.entity';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  // * CREAR SUCURSAL
  async create(createSucursalInput: CreateSucursalInput): Promise<Sucursal> {
    const newSucursal = this.sucursalRepository.create(createSucursalInput);
    return await this.sucursalRepository.save(newSucursal);
  }

  // ! ACTUALIZAR SUCURSAL
  async update(
    id: number,
    updateSucursalInput: UpdateSucursalInput,
  ): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.preload(updateSucursalInput);

    if (!sucursal)
      throw new NotFoundException(`Sucursal con el id: ${id} no se encuentra`);

    return this.sucursalRepository.save(sucursal);
  }

  // ? MOSTRAR SUCURSAL
  async findAll(): Promise<Sucursal[]> {
    return this.sucursalRepository.find();
  }

  // ? MOSTRAR UNA SUCURSAL
  async findOne(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOneBy({ id });

    if (!sucursal)
      throw new NotImplementedException(
        `La Sucursal con el id: ${id} no se encuentra`,
      );

    return sucursal;
  }

  // ! ELIMINAR SUCURSAL NO IMPLEMENTADO
  /* async remove(id: number) {
    return `This action removes a #${id} sucursal`;
  } */
}
