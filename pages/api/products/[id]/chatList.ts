import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req
  const product = await client.product.findUnique({
    where: {
      id: +id!,
    },
    select: {
      id: true,
      userId: true,
    },
  })

  if (req.method === "GET") {
    const chatList = await client.chatRoom.findMany({
      where: {
        sellerId: user?.id,
        product: {
          id: +id!,
          traded: false,
        },
      },
      include: {
        buyer: true,
        PrivateChats: true,
      },
    })

    return res.json({
      ok: true,
      chatList,
    })
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
