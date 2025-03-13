import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req

  console.log(id)

  const streams = await client.stream.findMany({
    where: {
      userId: +id!,
    },
  })

  res.json({
    ok: true,
    streams,
  })
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
