import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Manda la wea de token" });
  }

  const token = authorization.split(" ")[1];

  if (!token || authorization.split(" ")[0].toUpperCase() !== "BEARER") {
    return res.status(400).json({ message: "Formatea bien la wea gracias" });
  }
  try {
    const decodedToken = jwt.verify(token, "EstaEsLaKeyxd") as any;

    const _id = decodedToken._id;

    res.locals._id = _id;
    next();
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Internal server error | ${error.message}` });
  }
};
