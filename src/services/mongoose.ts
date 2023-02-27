import mongoose from "mongoose";
import logger from "../modules/logs";

const { USER, PASS, HOST, DBNAME } = process.env;

export async function connectDB() {
  const mongoAtlasUri = `mongodb+srv://${USER}:${PASS}@${HOST}/${DBNAME}?retryWrites=true&w=majority`;
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(mongoAtlasUri);
    logger.info('Succes connect');
  } catch (error: { [key: string]: any } | any) {
    logger.error(`Connection failed ${error.message}`);
  }
}