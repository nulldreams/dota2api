import { NowRequest, NowResponse } from '@vercel/node'
import { Dota2 } from '../helpers/dota2'

const dota2 = new Dota2()

export default async function (req: NowRequest, res: NowResponse): Promise<NowResponse> {
  try {
    if (req.query) return res.send(await dota2.findHeroe(req.query.heroe as string))

    const heroes = await dota2.listHeroes()
    return res.send(heroes)
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    })
  }
}
