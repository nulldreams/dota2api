export interface IDota2Hero {
  avatar?: string
  slug?: string
  info_url?: string
  name: string
  bio: string
  atk: string
  atk_l: string
  roles: string[]
  roles_l: string[]
}

export interface IDota2HeroImageInfo {
  avatar: string
  info_url: string
  main_attribute: string
}

export type IDota2HeroImage = Record<string, IDota2HeroImageInfo>

export interface IDota2Item {
  slug: string
  id: number
  img: string
  dname: string
  qual: string
  cost: number
  desc: string
  notes: string
  attrib: string
  mc: string
  cd: number
  lore: string
  components: null
  created: boolean
}
