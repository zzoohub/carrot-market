import { NextApiRequest, NextApiResponse } from "next";
import client from "./client";

interface ConfigType {
  method: "POST" | "GET" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(400).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(404).json({ ok: false, error: "plz login" });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  };
}
