import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const product = await client.product.findUnique({
    where: {
      id: +req.query.id,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
