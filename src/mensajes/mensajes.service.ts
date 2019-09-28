import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MensajeDto } from './dto/mensaje-dto';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>
    ) { }

    async findAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async findOne(id: number): Promise<Mensaje> {
        return await this.mensajeRepository.findOne(id);
    }

    async create(mensajeDTO: MensajeDto): Promise<Mensaje> {
        const mensajeEntity = new Mensaje();
        mensajeEntity.mensaje = mensajeDTO.mensaje;
        mensajeEntity.nick = mensajeDTO.nick;

        return await this.mensajeRepository.save(mensajeEntity);
    }

    async update(id: number, mensajeDTO: MensajeDto): Promise<Mensaje> {
        const mensajeDB = await this.mensajeRepository.findOne({
           _id: id
        });

        mensajeDB.nick = mensajeDTO.nick;
        mensajeDB.mensaje = mensajeDTO.mensaje;

        return await this.mensajeRepository.save(mensajeDB);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.mensajeRepository.delete(id);
    }
}
