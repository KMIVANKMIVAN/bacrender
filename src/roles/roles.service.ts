import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolInput, UpdateRolInput } from './dto/inputs';
import { Rol } from './entities/roles.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // * CREAR ROL
  async create(createRolInput: CreateRolInput): Promise<Rol> {
    const newRol = this.rolRepository.create(createRolInput);
    return await this.rolRepository.save(newRol);
  }

  // ! ACTUALIZAR ROL
  async update(id: number, updateRolInput: UpdateRolInput): Promise<Rol> {
    const rol = await this.rolRepository.preload(updateRolInput);

    if (!rol)
      throw new NotFoundException(`Rol con el id: ${id} no se encuentra`);

    return this.rolRepository.save(rol);
  }

  // ? MOSTRAR ROL
  async findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  // ? MOSTRAR UN ROL
  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol)
      throw new NotImplementedException(`Rol con el id: ${id} no se encuentra`);

    return rol;
  }

  /* async remove(id: number) {
    return `This action removes a #${id} rol`;
  } */
}
