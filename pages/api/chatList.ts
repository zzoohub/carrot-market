import { NextApiRequest, NextApiResponse } from "next"
import client from "../../libs/server/client"
import withHandler, { ResponseType } from "../../libs/server/withHandler"
import { withApiSession } from "../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req

  const chatList = await client.chatRoom.findMany({
    where: {
      OR: [{ sellerId: user?.id }, { buyerId: user?.id }],
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      buyer: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      PrivateChats: true,
    },
  })

  res.json({
    ok: true,
    chatList,
  })
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
