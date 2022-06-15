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
  } = req;

  const aleadyExist = await client.favorite.findFirst({
    where: {
      productId: +id,
      userId: user?.id,
    },
  });
  if (aleadyExist) {
    await client.favorite.delete({
      where: {
        id: aleadyExist.id,
      },
    });
  } else {
    const likedProduct = await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
