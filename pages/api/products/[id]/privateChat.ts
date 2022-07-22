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
    body: { message },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
  });

  if (req.method === "POST") {
    const newChat = await client.privateChat.create({
      data: {
        product: {
          connect: { id: product?.id },
        },
        seller: {
          connect: {
            id: user?.id,
          },
        },
        buyer: {
          connect: {
            id: product?.userId,
          },
        },
        privateMessage: message,
      },
    });

    return res.json({
      ok: true,
      newChat,
    });
  }

  if (req.method === "GET") {
    const productDetail = await client.product.findFirst({
      where: {
        id: +id,
      },
      select: {
        PrivateChats: {
          include: {
            seller: { select: { id: true, avatar: true, name: true } },
            buyer: { select: { id: true, avatar: true, name: true } },
          },
        },
      },
    });

    return res.json({
      ok: true,
      productDetail,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
