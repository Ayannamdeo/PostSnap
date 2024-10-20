import express, { Router, Request, Response } from "express";
import { UserRouter } from "../modules";
import { BlogRouter } from "../modules";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Health Check Passed" });
});

router.use("/api/users", UserRouter);
router.use("/api/blogs", BlogRouter);

export default router;
