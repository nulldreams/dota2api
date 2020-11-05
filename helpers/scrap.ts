import cheerio from 'cheerio'
import { IDota2HeroImage } from './interfaces/dota2.interface'

export class Scrap {
  private html: string
  private $ = null

  constructor(html: string) {
    this.html = html
  }

  public scrapHeroes(): IDota2HeroImage[] {
    const $ = cheerio.load(this.html)
    const heroes = []

    const mainAttributeClasses = {
      heroColLeft: 'strength',
      heroColMiddle: 'agility',
      heroColRight: 'intelligence',
    }

    $('.heroIcons')
      .find('a')
      .each(function () {
        const heroId = $(this).attr('id').replace(/link_/g, '')
        const heroMainAttribute = mainAttributeClasses[$(this).parent().parent().attr('class')]
        heroes.push({
          [heroId]: {
            slug: heroId,
            avatar: $(this).find('img').first().attr('src'),
            info_url: $(this).attr('href'),
            main_attribute: heroMainAttribute,
          },
        })
      })

    return heroes
  }
}
