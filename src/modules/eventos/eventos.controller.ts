
import { Request, Response } from "express";
import { EventosService } from "./eventos.service";

export class EventosController {

    private readonly eventosService = new EventosService();

    create = async (req: Request, res: Response): Promise<void> => {
        const evento = await this.eventosService.create(req.body);
        res.status(201).json(evento);
    };

    findAll = async (_req: Request, res: Response): Promise<void> => {
        const eventos = await this.eventosService.findAll();
        res.status(200).json(eventos);
    };

    findById = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const evento = await this.eventosService.findById(req.params.id);
        res.status(200).json(evento);
    };

    update = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const evento = await this.eventosService.update(
            req.params.id,
            req.body
        );

        res.status(200).json(evento);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        await this.eventosService.delete(req.params.id);
        res.status(204).send();
    };
}
