import { NowRequest, NowResponse } from '@vercel/node'
import { Dota2 } from '../../helpers/dota2'

const dota2 = new Dota2()

export default async function (req: NowRequest, res: NowResponse): Promise<NowResponse> {
  const heroes = await dota2.listHeroes()
  return res.send(heroes)
}
