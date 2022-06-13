import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
          },
        },
      },
    },
  });
}

export default withHandler("POST", handler);
