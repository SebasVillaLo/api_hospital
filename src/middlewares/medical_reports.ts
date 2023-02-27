import { RequestHandler } from "express";
import MedicalReport from "../model/MedicalReports";
import { decodeToken } from "../modules/jsonwtgenerator";
import { Auth } from "./types/auth.types";
import User from "../model/User";
import appRoot from 'app-root-path';
import htmlPdf from "html-pdf";

export const createReport: RequestHandler = async (req, res) => {
  const { description, id_patient, id_doctor, id_hospital, specialization } = req.body;

  const reportData = new MedicalReport({
    id_patient,
    id_doctor,
    id_hospital,
    specialization,
    description,
  });

  try {
    await reportData.save();
    return res.status(200).json({
      message: "Medical report has been create"
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const getReport: RequestHandler = async (req, res) => {

  const { token } = req.params;

  try {
    const dataToken = await decodeToken(token) as Auth;
    const user = await User.findOne({ identification: dataToken.identification });
    const reports = await MedicalReport.find({
      $or: [
        { id_patient: user!._id },
        { id_doctor: user!._id },
        { id_hospital: user!._id },
      ]
    });
    return res.status(200).json({
      reports
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const downloadReport: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dataFile = await MedicalReport.findById(id);
    if (!dataFile) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    const html = `
      <h1>Reporte medico</h1>
      <p>Descripcion: ${dataFile.description}</p>
    `;
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "45mm",
        contents: `
          <div style="text-align: center;">
            <h1>Reporte medico</h1>
          </div>
        `
      },
      "footer": {
        "height": "28mm",
        "contents": {
          first: 'Cover page',
          2: 'Second page',
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
          last: 'Last Page'
        }
      }
    };

    return htmlPdf.create(html, options as any).toFile("./reporte.pdf", (err, _) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }
      res.setHeader("Content-Disposition", `attachment; filename="reporte.pdf`);
      res.setHeader("Content-Type", "application/pdf");
      return res.download(`${appRoot}/reporte.pdf`, "reporte.pdf", (err) => {
          return err && res.status(500).json({ message: err.message });
      });
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}
