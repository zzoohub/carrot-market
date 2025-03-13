import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../../libs/server/client"
import withHandler, { ResponseType } from "../../../../libs/server/withHandler"
import { withApiSession } from "../../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req

  const aleadyExist = await client.wondering.findFirst({
    where: {
      postId: +id?.toString()!,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  })
  if (aleadyExist) {
    await client.wondering.delete({
      where: {
        id: aleadyExist.id,
      },
    })
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id?.toString()!,
          },
        },
      },
    })
  }

  return res.json({
    ok: true,
  })
}

export default withApiSession(withHandler({ methods: ["POST"], handler }))
