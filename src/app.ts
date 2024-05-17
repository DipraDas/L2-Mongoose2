import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route 
app.use("/api/v1/student", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

export default app;