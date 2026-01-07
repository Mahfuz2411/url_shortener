import express, { Request, Response } from "express";
import redirectControllers from "./redirect.controller";
import validateRequest from "../../middlewares/validateRequest";
import redirectValidations from "./redirect.validation";

const router = express.Router();

router.get("/:shortCode", validateRequest(redirectValidations.redirectParamSchema), redirectControllers.redirectUrl);

const redirectRouter = router;
export default redirectRouter;