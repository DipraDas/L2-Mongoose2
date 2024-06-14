import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173']
}));

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

export default app;