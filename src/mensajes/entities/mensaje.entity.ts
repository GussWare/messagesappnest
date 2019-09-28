import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";


@Entity()
export class Mensaje {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    nick: string;

    @Column()
    mensaje: string;
}
