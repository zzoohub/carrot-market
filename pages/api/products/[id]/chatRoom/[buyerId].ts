import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../../libs/server/withHandler"
import { withApiSession } from "../../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id, buyerId },
    session: { user },
    body: { chat },
  } = req
  const product = await client.product.findUnique({
    where: {
      id: +id!,
    },
  })

  if (req.method === "GET") {
    const chatRoom = await client.chatRoom.findFirst({
      where: {
        productId: product?.id,
        sellerId: product?.userId,
        buyerId: buyerId ? +buyerId : user?.id,
      },
      include: {
        PrivateChats: {
          include: {
            user: true,
          },
        },
      },
    })

    if (chatRoom) {
      return res.json({
        ok: true,
        product,
        chatRoom,
      })
    }

    return res.json({
      ok: true,
      product,
    })
  }

  if (req.method === "POST") {
    let chatRoom
    const existingChatRoom = await client.chatRoom.findFirst({
      where: {
        productId: product?.id,
        sellerId: product?.userId,
        buyerId: buyerId ? +buyerId : user?.id,
      },
    })
    if (existingChatRoom) {
      chatRoom = existingChatRoom
    } else {
      chatRoom = await client.chatRoom.create({
        data: {
          seller: {
            connect: {
              id: product?.userId,
            },
          },
          buyer: {
            connect: {
              id: user?.id,
            },
          },
          product: {
            connect: {
              id: product?.id,
            },
          },
        },
      })
    }

    const newChat = await client.privateChat.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        chatRoom: {
          connect: {
            id: chatRoom?.id,
          },
        },
        chat,
      },
    })

    return res.json({
      ok: true,
      newChat,
    })
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET"], handler }))
