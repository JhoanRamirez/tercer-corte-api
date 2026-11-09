import { ObjectId } from "mongodb";


export interface Producto {
    _id?: ObjectId;
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;
}

/**
 * Datos que el cliente puede enviar sobre un demo.
 * Todos los campos son opcionales; el servicio valida qué es
 * obligatorio según la operación (crear vs. actualizar).
 */
export interface ProductoDTO {
    nombre?: string;
    precio?: number;
    categoria?: string;
    stock?: number;
}
