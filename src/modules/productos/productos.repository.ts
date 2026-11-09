
import { getDb } from "../../config/database";
import { Producto } from "./productos.model";
import { Collection, ObjectId } from "mongodb";

export class ProductosRepository {

    private collection(): Collection<Producto> {
        return getDb().collection<Producto>("productos");
    }

    async create(data: Omit<Producto, "_id">): Promise<Producto> {
        const result = await this.collection().insertOne(data);
        return { _id: result.insertedId, ...data };
    }

    async findAll(): Promise<Producto[]> {
        return this.collection().find().toArray();
    }

    async findById(id: ObjectId): Promise<Producto | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(
        id: ObjectId,
        changes: Partial<Producto>
    ): Promise<Producto | null> {
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