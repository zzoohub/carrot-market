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

  const deleted = await client.product.delete({
    where: {
      id: +id!,
    },
  });

  if (!deleted) {
    return res.json({
      ok: false,
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
