import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

const PORT: number = Number(process.env.PORT) || 3010;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`backend running on http://localhost:${PORT}`);
});
