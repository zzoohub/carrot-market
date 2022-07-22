import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { chat },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (req.method === "GET") {
    const alreadyChatRoom = await client.chatRoom.findFirst({
      where: {
        productId: +id,
        sellerId: product?.userId,
        buyerId: user?.id,
      },
      include: {
        PrivateChats: {
          include: {
            user: true,
          },
        },
        product: true,
      },
    });
    if (alreadyChatRoom) {
      return res.json({
        ok: true,
        chatRoom: alreadyChatRoom,
      });
    }
    const newChatRoom = await client.chatRoom.create({
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
    });

    return res.json({
      ok: true,
      chatRoom: newChatRoom,
    });
  }

  if (req.method === "POST") {
    const chatRoom = await client.chatRoom.findFirst({
      where: {
        productId: product?.id,
        sellerId: product?.userId,
        buyerId: user?.id,
      },
    });

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
    });

    return res.json({
      ok: true,
      newChat,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
