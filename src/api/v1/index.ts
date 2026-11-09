import { Router } from "express";
import demoRoutes from "../../modules/demo/demo.routes";
import productosRoutes from "../../modules/productos/productos.routes";
import eventosRoutes from "../../modules/eventos/eventos.routes";

const router = Router();

router.use("/demo", demoRoutes);
router.use("/productos", productosRoutes);
router.use("/eventos", eventosRoutes);

export default router;