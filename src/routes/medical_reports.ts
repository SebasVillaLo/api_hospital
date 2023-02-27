import { Router } from "express";
import { createReport, downloadReport, getReport } from "../middlewares/medical_reports";

const routes = Router();

routes.post("/create_report", createReport);
routes.get("/get_reports/:token", getReport);
routes.get("/download_report/:id", downloadReport)

export default routes;