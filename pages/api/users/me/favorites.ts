import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req

  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              Favorites: true,
            },
          },
        },
      },
    },
  })

  return res.json({
    ok: true,
    favorites,
  })
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
