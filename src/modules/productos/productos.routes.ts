
import { Router } from "express";
import { ProductosController } from "./productos.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const productosController = new ProductosController();

router.post("/", asyncHandler(productosController.create));
router.get("/", asyncHandler(productosController.findAll));
router.get("/:id", asyncHandler(productosController.findById));
router.put("/:id", asyncHandler(productosController.update));
router.delete("/:id", asyncHandler(productosController.delete));

export default router;