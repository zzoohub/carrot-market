import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../withHandler";

import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";

const sendMail = (email: any) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API!,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client
    .sendMail(email)
    .then(() => {
      console.log("Message sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendSecretMail = (address: string, secret: string) => {
  const emailData = {
    from: process.env.MY_EMAIL,
    to: address,
    subject: "Login Secret for Prismagram 🚀",
    html: `<h1>hello! your login secret is ${secret}.</h1>
  <h2>Copy paste on the web/app to Login</h2>`,
  };
  console.log(emailData);
  return sendMail(emailData);
};
// mailgun

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const sendEmail = await sendSecretMail(process.env.MY_EMAIL!, "test words")
      .then((result: any) => console.log(`result is ${result}`))
      .catch((err: any) => console.log(`error is ${err}`));
  }

  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
