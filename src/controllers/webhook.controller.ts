import type { Request, Response } from "express";

export const webhookController = {
  async handle(req: Request, res: Response) {
    console.log(req.body);

    return res.status(200).json({
      received: true,
    });
  },
};
