import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { MensajeDto } from './dto/mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajesService: MensajesService) {

    }

    @Get()
    async findAll(@Res() res) {
        try {
            const response = await this.mensajesService.findAll();
            res.status(HttpStatus.OK).send(response);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id, @Res() res) {
        try {
            const response = await this.mensajesService.findOne(id);

            if (response) {
                res.status(HttpStatus.OK).send(response);
            } else {
                res.status(HttpStatus.NOT_FOUND).send({ menaje: "Registro no encontrado" })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        }
    }

    @Post()
    async create(@Body() mensajeDTO: MensajeDto, @Res() res) {
        try {
            const response = await this.mensajesService.create(mensajeDTO);
            res.status(HttpStatus.CREATED).send(response);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        }
    }

    @Put(':id')
    async update(@Body() mensajeDTO: MensajeDto, @Res() res, @Param('id') id) {
        try {
            const response = await this.mensajesService.update(id, mensajeDTO);
            res.status(HttpStatus.OK).send(response);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        }
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id) {
        try {
            const response = await this.mensajesService.delete(id);
            res.status(HttpStatus.OK).send(response);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        }
    }
}
