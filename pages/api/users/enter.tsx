import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;

  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      ...payload,
    },
    update: {},
  });
  // if (email) {
  //   user = await client.user.findUnique({
  //     where: { email },
  //   });
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         email,
  //       },
  //     });
  //   }
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: { phone: +phone },
  //   });
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         phone: +phone,
  //       },
  //     });
  //   }
  // }
  console.log(user);
  res.json(user);
}

export default withHandler("POST", handler);
