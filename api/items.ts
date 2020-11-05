import { NowRequest, NowResponse } from '@vercel/node'
import { Dota2 } from '../helpers/dota2'

const dota2 = new Dota2()

export default async function (req: NowRequest, res: NowResponse): Promise<NowResponse> {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    if (req.query.item) return res.send(await dota2.findItem(req.query.item as string))

    const items = await dota2.listItems()

    return res.send(items)
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    })
  }
}
