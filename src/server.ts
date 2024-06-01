import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from 'http';

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Promise Rejection is detected. Server is shutting down........')
  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on("uncaughtException", () => {
  console.log(
    `uncaughtException is detected. process is shuttin down .........`
  );
  process.exit(1);
});