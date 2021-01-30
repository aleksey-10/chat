import { Router } from "express";
import { messages } from "../data";

const router = Router();

router.get('/', (req, res) => {
  res.json({ messages });
});

export default router;