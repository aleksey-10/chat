import { Router } from "express";

const router = Router();

const messages = [
  {
    id: 1,
    userName: 'Lexa',
    text: 'Hello, guys',
  },
  {
    id: 2,
    userName: 'Ania',
    text: 'Hello Lexa',
  }
];

router.get('/', (req, res) => {
  res.json({ messages });
});

export default router;
