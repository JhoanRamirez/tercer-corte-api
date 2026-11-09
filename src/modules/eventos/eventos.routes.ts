
import { Router } from "express";
import { EventosController } from "./eventos.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const eventosController = new EventosController();

router.post("/", asyncHandler(eventosController.create));
router.get("/", asyncHandler(eventosController.findAll));
router.get("/:id", asyncHandler(eventosController.findById));
router.put("/:id", asyncHandler(eventosController.update));
router.delete("/:id", asyncHandler(eventosController.delete));

export default router;
