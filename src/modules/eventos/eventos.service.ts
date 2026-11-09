
import { ObjectId } from "mongodb";
import {
    Evento,
    EventoDTO,
    EstadoEvento
} from "./eventos.model";
import { EventosRepository } from "./eventos.repository";
import {
    BadRequestError,
    NotFoundError
} from "../../shared/errors/AppError";

export class EventosService {

    private readonly eventosRepository = new EventosRepository();

    async create(data: EventoDTO): Promise<Evento> {

        const nombre = this.requireString(data?.nombre, "nombre");
        const descripcion = this.requireString(
            data?.descripcion,
            "descripcion"
        );
        const fecha = this.requireDate(data?.fecha);
        const lugar = this.requireString(data?.lugar, "lugar");
        const categoria = this.requireString(
            data?.categoria,
            "categoria"
        );
        const capacidad = this.requireCapacity(data?.capacidad);

        const estado = data.estado === undefined
            ? "programado"
            : this.requireStatus(data.estado);

        return this.eventosRepository.create({
            nombre,
            descripcion,
            fecha,
            lugar,
            categoria,
            capacidad,
            estado
        });
    }

    async findAll(): Promise<Evento[]> {
        return this.eventosRepository.findAll();
    }

    async findById(id: string): Promise<Evento> {

        const evento = await this.eventosRepository.findById(
            this.toObjectId(id)
        );

        if (!evento) {
            throw new NotFoundError("Evento no encontrado");
        }

        return evento;
    }

    async update(id: string, data: EventoDTO): Promise<Evento> {

        const objectId = this.toObjectId(id);
        const changes: Partial<Evento> = {};

        if (data.nombre !== undefined) {
            changes.nombre = this.requireString(data.nombre, "nombre");
        }

        if (data.descripcion !== undefined) {
            changes.descripcion = this.requireString(
                data.descripcion,
                "descripcion"
            );
        }

        if (data.fecha !== undefined) {
            changes.fecha = this.requireDate(data.fecha);
        }

        if (data.lugar !== undefined) {
            changes.lugar = this.requireString(data.lugar, "lugar");
        }

        if (data.categoria !== undefined) {
            changes.categoria = this.requireString(
                data.categoria,
                "categoria"
            );
        }

        if (data.capacidad !== undefined) {
            changes.capacidad = this.requireCapacity(data.capacidad);
        }

        if (data.estado !== undefined) {
            changes.estado = this.requireStatus(data.estado);
        }

        if (Object.keys(changes).length === 0) {
            throw new BadRequestError(
                "No se enviaron campos para actualizar"
            );
        }

        const updated = await this.eventosRepository.update(
            objectId,
            changes
        );

        if (!updated) {
            throw new NotFoundError("Evento no encontrado");
        }

        return updated;
    }

    async delete(id: string): Promise<void> {

        const deleted = await this.eventosRepository.delete(
            this.toObjectId(id)
        );

        if (!deleted) {
            throw new NotFoundError("Evento no encontrado");
        }
    }

    private requireString(value: unknown, field: string): string {

        if (typeof value !== "string" || value.trim() === "") {
            throw new BadRequestError(
                `El campo '${field}' es obligatorio y debe ser un texto no vacío`
            );
        }

        return value.trim();
    }

    private requireDate(value: unknown): Date {

        if (
            !(typeof value === "string" || value instanceof Date) ||
            value === ""
        ) {
            throw new BadRequestError(
                "El campo 'fecha' es obligatorio y debe ser una fecha válida"
            );
        }

        const fecha = new Date(value);

        if (Number.isNaN(fecha.getTime())) {
            throw new BadRequestError("La fecha del evento no es válida");
        }

        return fecha;
    }

    private requireCapacity(value: unknown): number {

        if (
            typeof value !== "number" ||
            !Number.isInteger(value) ||
            value < 1
        ) {
            throw new BadRequestError(
                "La capacidad debe ser un número entero mayor que cero"
            );
        }

        return value;
    }

    private requireStatus(value: unknown): EstadoEvento {

        const estados: EstadoEvento[] = [
            "programado",
            "cancelado",
            "finalizado"
        ];

        if (
            typeof value !== "string" ||
            !estados.includes(value as EstadoEvento)
        ) {
            throw new BadRequestError(
                "El estado debe ser programado, cancelado o finalizado"
            );
        }

        return value as EstadoEvento;
    }

    private toObjectId(id: string): ObjectId {

        if (!ObjectId.isValid(id)) {
            throw new BadRequestError(
                `Identificador inválido: ${id}`
            );
        }

        return new ObjectId(id);
    }
}
