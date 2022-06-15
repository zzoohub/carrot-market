import { NextApiRequest, NextApiResponse } from "next";
import client from "./client";

interface ConfigType {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

type Method = "POST" | "GET" | "DELETE";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
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
