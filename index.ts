import app from "./src/config";
import logger from "./src/modules/logs";
import { connectDB } from "./src/services/mongoose";

const { PORT } = process.env;


async function run() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

run();