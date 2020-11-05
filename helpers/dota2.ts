import axios, { AxiosInstance } from 'axios'
import { RequestError } from './error'
import { IDota2Heroe, IDota2HeroeImage } from './interfaces/dota2.interface'
import { Scrap } from './scrap'

export class Dota2 {
  private DOTA_URL = 'http://www.dota2.com'
  private heroesInfo: AxiosInstance
  private heroesImages: IDota2HeroeImage[]
  public heroesList: IDota2Heroe[]

  constructor() {
    this.heroesInfo = axios.create({
      baseURL: this.DOTA_URL,
      params: {
        l: 'portuguese',
      },
    })
  }

  public async findHero(hero: string) {
    const { data } = await this.heroesInfo.get('/jsfeed/heropickerdata')

    const heroes = data
    const heroInfo = heroes[hero]

    if (!heroInfo) throw new RequestError('hero not found')

    const heroImage = await this.findHeroImage(hero)

    return { ...heroInfo, ...heroImage }
  }

  public async listHeroes(): Promise<IDota2Heroe[]> {
    const heroes = await this.heroesInfo.get('/jsfeed/heropickerdata')
    const heroesList = await this.fillHeroesWithImages(heroes.data)

    this.heroesList = heroesList

    return this.heroesList
  }

  private async getHeroesImages(): Promise<IDota2HeroeImage[]> {
    const { data } = await this.heroesInfo.get('/heroes')

    const heroesImages = new Scrap(data).scrapHeroes()

    return heroesImages
  }

  private async fillHeroesWithImages(heroes: IDota2Heroe[]) {
    const heroesImages = await this.getHeroesImages()
    const filledImageHeroes = Object.keys(heroes).map((hero) => {
      const heroImage = heroesImages.find((hImg) => hImg[hero])
      return { ...heroes[hero], ...heroImage[hero] }
    })

    return filledImageHeroes
  }

  private async findHeroImage(hero: string) {
    if (!this.heroesImages) this.heroesImages = await this.getHeroesImages()

    const heroImage = this.heroesImages.find((heroImage) => heroImage[hero])

    return heroImage[hero]
  }
}
