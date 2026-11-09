
import { ObjectId } from "mongodb";
import { Producto, ProductoDTO } from "./productos.model";
import { ProductosRepository } from "./productos.repository";
import {BadRequestError,NotFoundError} from "../../shared/errors/AppError";

export class ProductosService {

    private readonly productosRepository = new ProductosRepository();

    async create(data: ProductoDTO): Promise<Producto> {
        const nombre = this.requireString(data?.nombre, "nombre");
        const categoria = this.requireString(data?.categoria, "categoria");
        const precio = this.requireNumber(data?.precio, "precio");
        const stock = this.requireInteger(data?.stock, "stock");

        return this.productosRepository.create({
            nombre,
            precio,
            categoria,
            stock
        });
    }

    async findAll(): Promise<Producto[]> {
        return this.productosRepository.findAll();
    }

    async findById(id: string): Promise<Producto> {
        const producto = await this.productosRepository.findById(
            this.toObjectId(id)
        );

        if (!producto) {
            throw new NotFoundError("Producto no encontrado");
        }

        return producto;
    }

    async update(id: string, data: ProductoDTO): Promise<Producto> {
        const objectId = this.toObjectId(id);
        const changes: Partial<Producto> = {};

        if (data.nombre !== undefined) {
            changes.nombre = this.requireString(data.nombre, "nombre");
        }

        if (data.categoria !== undefined) {
            changes.categoria = this.requireString(
                data.categoria,
                "categoria"
            );
        }

        if (data.precio !== undefined) {
            changes.precio = this.requireNumber(data.precio, "precio");
        }

        if (data.stock !== undefined) {
            changes.stock = this.requireInteger(data.stock, "stock");
        }

        if (Object.keys(changes).length === 0) {
            throw new BadRequestError(
                "No se enviaron campos para actualizar"
            );
        }

        const updated = await this.productosRepository.update(
            objectId,
            changes
        );

        if (!updated) {
            throw new NotFoundError("Producto no encontrado");
        }

        return updated;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.productosRepository.delete(
            this.toObjectId(id)
        );

        if (!deleted) {
            throw new NotFoundError("Producto no encontrado");
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

    private requireNumber(value: unknown, field: string): number {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < 0
        ) {
            throw new BadRequestError(
                `El campo '${field}' debe ser un número mayor o igual a 0`
            );
        }

        return value;
    }

    private requireInteger(value: unknown, field: string): number {
        if (
            typeof value !== "number" ||
            !Number.isInteger(value) ||
            value < 0
        ) {
            throw new BadRequestError(
                `El campo '${field}' debe ser un entero mayor o igual a 0`
            );
        }

        return value;
    }

    private toObjectId(id: string): ObjectId {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestError(`Identificador inválido: ${id}`);
        }

        return new ObjectId(id);
    }
}
