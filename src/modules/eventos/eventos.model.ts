import { ObjectId } from "mongodb";

export type EstadoEvento = "programado" | "cancelado" | "finalizado";

export interface Evento {
    _id?: ObjectId;
    nombre: string;
    descripcion: string;
    fecha: Date;
    lugar: string;
    categoria: string;
    capacidad: number;
    estado: EstadoEvento;
}
/**
 * Datos que el cliente puede enviar sobre un demo.
 * Todos los campos son opcionales; el servicio valida qué es
 * obligatorio según la operación (crear vs. actualizar).
 */
export interface EventoDTO {
    nombre?: string;
    descripcion?: string;
    fecha?: string | Date;
    lugar?: string;
    categoria?: string;
    capacidad?: number;
    estado?: EstadoEvento;
}
