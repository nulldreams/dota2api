import axios, { AxiosInstance } from 'axios'
import { RequestError } from './error'
import { IDota2Hero, IDota2HeroImage, IDota2Item } from './interfaces/dota2.interface'
import { Scrap } from './scrap'

export class Dota2 {
  private DOTA_URL = 'http://www.dota2.com'
  private info: AxiosInstance
  private heroesImages: IDota2HeroImage[]
  public heroesList: IDota2Hero[]
  public itemsList: IDota2Item[]

  constructor() {
    this.info = axios.create({
      baseURL: this.DOTA_URL,
      params: {
        l: 'portuguese',
      },
    })
  }

  public async findHero(hero: string) {
    const { data } = await this.info.get('/jsfeed/heropickerdata')

    const heroes = data
    const heroInfo = heroes[hero]

    if (!heroInfo) throw new RequestError('hero not found')

    const heroImage = await this.findHeroImage(hero)

    return { ...heroInfo, ...heroImage }
  }

  public async listHeroes(): Promise<IDota2Hero[]> {
    const heroes = await this.info.get('/jsfeed/heropickerdata')
    const heroesList = await this.fillHeroesWithImages(heroes.data)

    this.heroesList = heroesList

    return this.heroesList
  }

  private async getHeroesImages(): Promise<IDota2HeroImage[]> {
    const { data } = await this.info.get('/heroes')

    const heroesImages = new Scrap(data).scrapHeroes()

    return heroesImages
  }

  private async fillHeroesWithImages(heroes: IDota2Hero[]) {
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

  public async listItems(): Promise<IDota2Item[]> {
    const { data } = await this.info.get('/jsfeed/itemdata')

    const itemsData = data.itemdata
    const items = Object.keys(itemsData).map((itemKey) => ({
      slug: itemKey,
      ...itemsData[itemKey],
    }))

    this.itemsList = items

    return this.itemsList
  }

  public async findItem(item: string): Promise<IDota2Item> {
    const { data } = await this.info.get('/jsfeed/itemdata')
    const items = data.itemdata

    const itemData = items[item]

    if (!itemData) throw new RequestError('item not found')

    return { slug: item, ...itemData }
  }
}
