import cheerio from 'cheerio'
import { IDota2HeroeImage } from './interfaces/dota2.interface'

export class Scrap {
  private html: string
  private $ = null

  constructor(html: string) {
    this.html = html
  }

  public scrapHeroes(): IDota2HeroeImage[] {
    const $ = cheerio.load(this.html)
    const heroes = []

    $('.heroIcons')
      .find('a')
      .each(function () {
        const heroeId = $(this).attr('id').replace(/link_/g, '')
        heroes.push({
          [heroeId]: {
            avatar: $(this).find('img').first().attr('src'),
            info_url: $(this).attr('href'),
          },
        })
      })

    return heroes
  }
}
