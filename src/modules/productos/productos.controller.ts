
import { Request, Response } from "express";
import { ProductosService } from "./productos.service";

export class ProductosController {

    private readonly productosService = new ProductosService();

    create = async (req: Request, res: Response): Promise<void> => {
        const producto = await this.productosService.create(req.body);
        res.status(201).json(producto);
    };

    findAll = async (_req: Request, res: Response): Promise<void> => {
        const productos = await this.productosService.findAll();
        res.status(200).json(productos);
    };

    findById = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const producto = await this.productosService.findById(req.params.id);
        res.status(200).json(producto);
    };

    update = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const producto = await this.productosService.update(
            req.params.id,
            req.body
        );

        res.status(200).json(producto);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        await this.productosService.delete(req.params.id);
        res.status(204).send();
    };
}
