import { NextApiRequest, NextApiResponse } from "next"
import client from "../../libs/server/client"
import withHandler, { ResponseType } from "../../libs/server/withHandler"
import { withApiSession } from "../../libs/server/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const response = await (
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
      },
    })
  ).json()

  return res.json({
    ok: true,
    ...response.result,
  })
}

export default withApiSession(withHandler({ methods: ["GET"], handler }))
