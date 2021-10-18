import { Response } from "express";

export const sendError = (status: number, message: string, res: Response) => {
  return res.status(status).json({ message });
};
