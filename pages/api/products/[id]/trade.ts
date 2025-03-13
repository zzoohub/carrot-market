import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req

  const product = await client.product.findUnique({
    where: { id: +id! },
  })

  if (req.method === "POST") {
    await client.product.update({
      where: { id: +id! },
      data: {
        traded: true,
      },
    })

    const saled = await client.sale.create({
      data: {
        user: {
          connect: {
            id: product?.userId,
          },
        },
        product: {
          connect: {
            id: product?.id,
          },
        },
      },
    })

    const purchased = await client.purchase.create({
      data: {
        user: {
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
    return res.json({
      ok: true,
    })
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }))
