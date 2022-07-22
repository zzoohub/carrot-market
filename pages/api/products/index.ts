import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description, photoId },
    session: { user },
  } = req;
  if (!user) return res.status(404).redirect("/enter");

  if (req.method === "POST") {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }

  if (req.method === "GET") {
    const products = await client.product.findMany({
      where: {
        traded: false,
      },
      include: {
        _count: {
          select: {
            Favorites: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      products,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
