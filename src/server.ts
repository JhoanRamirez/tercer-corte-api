import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '1.0.0.1']);

const bootstrap = async (): Promise<void> => {
    await connectDB();

    app.listen(env.port, () => {
        console.log(`Servidor corriendo en el puerto ${env.port} [${env.nodeEnv}]`);
    });
};

bootstrap().catch((error) => {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
});
