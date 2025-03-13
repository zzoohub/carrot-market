import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req
  if (req.method === "GET") {
    const stream = await client.stream.findUnique({
      where: {
        id: +id?.toString()!,
      },
      include: {
        LiveChats: {
          select: {
            id: true,
            liveMessage: true,
            user: {
              select: {
                id: true,
                avatar: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })
    const isOwner = user?.id === stream?.userId
    if (stream && !isOwner) {
      stream.streamKey = "xxx"
      stream.streamUrl = "xxx"
    }
    return res.json({
      ok: true,
      stream,
    })
  }

  if (req.method === "POST") {
    await client.stream.update({
      where: {
        id: +id!,
      },
      data: {
        live: false,
      },
    })
    return res.json({
      ok: true,
    })
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }))
