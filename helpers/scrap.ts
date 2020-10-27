import { load } from 'cheerio'

export const HeroesList = (html: string) => {
  const $ = load(html)

  console.log($('heroIcons').length)
}
