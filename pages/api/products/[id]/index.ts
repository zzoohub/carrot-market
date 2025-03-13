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
      id: +req.query.id!,
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
  })
  const terms = product?.name.split(" ").map(word => ({
    name: {
      contains: word,
    },
  }))
  const relatedProduct = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        NOT: {
          name: product?.name,
        },
      },
    },
  })

  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        userId: user?.id,
        productId: product?.id,
      },
      select: {
        id: true,
      },
    }),
  )

  res.json({
    ok: true,
    product,
    relatedProduct,
    isLiked,
  })
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
