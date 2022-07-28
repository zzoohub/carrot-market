import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { id },
    body: { liveMessage },
  } = req;

  const newChats = await client.liveChat.create({
    data: {
      liveMessage,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id!,
        },
      },
    },
  });
  res.json({
    ok: true,
    newChats,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
