import { NextApiRequest, NextApiResponse } from "next";
import mail from "../../../node_modules/@sendgrid/mail";
import twilio from "twilio";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// mail.setApiKey(process.env.SENDGRID_API_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (!user) {
    return res.status(400).json({ ok: false });
  }

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
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: process.env.MY_EMAIL!,
    //   to: process.env.MY_EMAIL!,
    //   subject: "Carrot-market",
    //   text: `Your token is ${payload}`,
    //   html: `<h1>Your token is ${payload}</h1>`,
    // });
    // console.log(email);
  }
  console.log(token);
  return res.json({ ok: true, token });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
