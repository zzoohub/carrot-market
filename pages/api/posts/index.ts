import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../libs/server/client"
import withHandler, { ResponseType } from "../../../libs/server/withHandler"
import { withApiSession } from "../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const {
      session: { user },
      body: { question, latitude, longitude },
    } = req
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    await res.revalidate("/comunity")
    res.json({
      ok: true,
      post,
    })
  }

  if (req.method === "GET") {
    // const {
    //   query: { latitude, longitude },
    // } = req;

    // const parsedLatitude = parseFloat(latitude.toString());
    // const parsedLongitude = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Answers: true,
            Wonderings: true,
          },
        },
      },
      // where: {
      //   latitude: {
      //     gte: parsedLatitude - 0.01,
      //     lte: parsedLatitude + 0.01,
      //   },
      //   longitude: {
      //     gte: parsedLongitude - 0.01,
      //     lte: parsedLongitude + 0.01,
      //   },
      // },
    })
    res.json({
      ok: true,
      posts,
    })
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }))
