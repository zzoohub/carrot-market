import { NextApiRequest, NextApiResponse } from "next";
import { userInfo } from "os";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    return res.json({
      ok: true,
      profile,
    });
  }

  if (req.method === "POST") {
    const {
      session: { user },
      body: { name, email, phone, avatarId },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && currentUser?.email !== email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: { id: true },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Email already taken..",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      // res.json({
      //   ok: true,
      // });
    } // email check
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Phone already in use..",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      `  // res.json({
      //   ok: true,
      // });`;
    } // phone check
    if (name) {
      await client.user.update({
        where: { id: user?.id },
        data: { name },
      });
    }
    if (avatarId) {
      await client.user.update({
        where: { id: user?.id },
        data: { avatar: avatarId },
      });
    }
    return res.json({ ok: true });
  } // Post request
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
