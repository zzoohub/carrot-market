import { NextApiRequest, NextApiResponse } from "next"
import client from "../..//../libs/server/client"
import withHandler, { ResponseType } from "../../../libs/server/withHandler"
import { withApiSession } from "../../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req
    const streams = await client.stream.findMany({
      take: 10,
      skip: +page! * 10,
      where: {
        live: true,
      },
    })
    res.json({
      ok: true,
      streams,
    })
  } else if (req.method === "POST") {
    const {
      session: { user },
      body: { name, price, description, title },
    } = req

    const {
      result: {
        uid,
        rtmps: { url, streamKey },
      },
    } = await (
      await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
        },
        body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
      })
    ).json()

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        title,
        user: {
          connect: {
            id: user?.id,
          },
        },
        streamId: uid,
        streamKey,
        streamUrl: url,
      },
    })
    res.json({
      ok: true,
      stream,
    })
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET"], handler }))
