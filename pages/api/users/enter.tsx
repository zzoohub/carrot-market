import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newUser = await client.user.create({
    data: {
      email: req.body.email ? req.body.email : null,
      phone: req.body.phone ? Number(req.body.phone) : null,
    },
  });
  res.status(200).json(newUser);
}
