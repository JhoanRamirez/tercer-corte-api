
import { getDb } from "../../config/database";
import { Evento } from "./eventos.model";
import { Collection, ObjectId } from "mongodb";

export class EventosRepository {

    private collection(): Collection<Evento> {
        return getDb().collection<Evento>("eventos");
    }

    async create(data: Omit<Evento, "_id">): Promise<Evento> {
        const result = await this.collection().insertOne(data);

        return {
            _id: result.insertedId,
            ...data
        };
    }

    async findAll(): Promise<Evento[]> {
        return this.collection()
            .find()
            .sort({ fecha: 1 })
            .toArray();
    }

    async findById(id: ObjectId): Promise<Evento | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(
        id: ObjectId,
        changes: Partial<Evento>
    ): Promise<Evento | null> {

        const result = await this.collection().findOneAndUpdate(
            { _id: id },
            { $set: changes },
            { returnDocument: "after" }
        );

        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {
        const result = await this.collection().deleteOne({ _id: id });

        return result.deletedCount === 1;
    }
}
